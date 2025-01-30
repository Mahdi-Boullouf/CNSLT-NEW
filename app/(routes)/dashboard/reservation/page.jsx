"use client";

import React, { useState, useEffect, useCallback } from "react";
import Loading from "@/components/ui/Loading";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  useGetAllReservation,
  useConfirmRoomReservation,
  useDeleteReservation,
} from "@/hooks/useFetchReservation";
import toast from "react-hot-toast";
import { FcOk } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import Error from "@/components/ui/Error";
import ReservationDetailsDialog from "@/components/ReservationDetailsDialog";
import DownloadButton from "@/components/ui/DownloadButton";
import { useAuth } from "@/contexts/AuthContext";
import { CiTrash } from "react-icons/ci";
import { useRefuseRoomReservation } from "@/hooks/useFetchReservation";
import DialogPaymentReservation from "@/components/DialogPaymentReservation";
import { IoMdCloudDownload } from "react-icons/io";
import axios from "axios";

const StatusCellRenderer = ({ value }) => {
  const statusStyles = {
    accepted: "bg-green-500 text-black  font-semibold",
    pending: "bg-yellow-500 text-black font-semibold",
    refused: "bg-red-500 text-black font-semibold",
    default: "bg-gray-500 text-black font-semibold",
  };

  const status = value.toLowerCase();
  const styleClass = statusStyles[status] || statusStyles.default;

  return (
    <div className="flex items-center justify-center mt-2">
      <div
        className={`${styleClass} w-4/5 py-2 px-3 rounded-lg text-center text-sm`}
      >
        {value}
      </div>
    </div>
  );
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ActionCellRenderer = ({
  data,
  updateStatus,
  deleteReservation,
  userType,
}) => {
  const isAccepted = data.status === "accepted";
  const { token } = useAuth();

  const buttonClasses = (color) => `
    text-black flex items-center border px-2 py-1 text-sm rounded mr-2
    ${
      isAccepted
        ? "bg-gray-300 border-gray-100 cursor-not-allowed opacity-50"
        : `border-${color}-500 hover:bg-${color}-100 active:bg-${color}-200`
    }
  `;

  const handleAccept = (e) => {
    e.stopPropagation(); // Stop event propagation
    if (!isAccepted) updateStatus(data._id, "accepted");
  };
  const handleDownload = async (e) => {
    e.stopPropagation(); // Stop event propagation
    try {
      const response = await axios.get(
        `${BASE_URL}/reservation/export/${data._id}`,
        {
          headers: { Authorization: token },
          responseType: "arraybuffer", // Important for binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reservation.xlsx"); // Set the file name
      document.body.appendChild(link);
      link.click();

      // Clean up the link after the download
      link.parentNode.removeChild(link);

      console.log("Reservation exported successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const handleRefuse = (e) => {
    e.stopPropagation(); // Stop event propagation
    if (!isAccepted) updateStatus(data._id, "refused");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Stop event propagation
    deleteReservation(data._id);
  };

  return (
    <div className="flex items-center justify-center p-2">
      <button
        onDoubleClick={handleAccept}
        className={buttonClasses("green")}
        disabled={isAccepted}
      >
        <FcOk className="h-4 w-4" />
      </button>
      {userType !== "receptor" ? (
        <button
          onDoubleClick={handleRefuse}
          className={buttonClasses("red")}
          disabled={isAccepted}
        >
          <TiDelete className="text-red-500 h-4 w-4" />
        </button>
      ) : null}
      {userType == "superadmin" ? (
        <button
          onDoubleClick={handleDelete}
          className={buttonClasses("red")}
          disabled={isAccepted}
        >
          <CiTrash className="text-red-500 h-4 w-4" />
        </button>
      ) : null}
      <button
        onDoubleClick={handleDownload}
        className={buttonClasses("green")}
        // disabled={isAccepted}
      >
        <IoMdCloudDownload className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function Reservation() {
  // user?.type === "admin" || "receptor"

  const { token, user, areaId } = useAuth();
  const {
    data: initialReservations,
    error,
    isLoading,
    GetAllReservation,
  } = useGetAllReservation();
  const { ConfirmRoomReservation } = useConfirmRoomReservation();
  const { RefuseRoomReservation } = useRefuseRoomReservation();
  const { DeleteReservation } = useDeleteReservation();
  const [reservations, setReservations] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const onRowClicked = (event) => {
    setSelectedReservation(event.data);
  };

  const closeDialog = () => {
    setSelectedReservation(null);
  };
  useEffect(() => {
    GetAllReservation({ area: areaId });
  }, [areaId]);

  useEffect(() => {
    if (initialReservations) {
      setReservations(initialReservations);
    }
  }, [initialReservations]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const updateStatus = useCallback(
    async (id, newStatus) => {
      try {
        if (newStatus == "accepted") {
          await ConfirmRoomReservation(id, newStatus);
        }
        if (newStatus == "refused") {
          await RefuseRoomReservation(id, newStatus);
        }
        // await ConfirmRoomReservation(id, newStatus)
        const updatedReservations = reservations.map((reservation) =>
          reservation._id === id
            ? { ...reservation, status: newStatus }
            : reservation
        );
        setReservations(updatedReservations);
        gridApi.setRowData(updatedReservations);
        toast.success(`Status updated to ${newStatus}`);
      } catch (error) {
        toast.error("Failed to update status");
        console.error("Error updating status:", error);
      }
    },
    [reservations, gridApi, ConfirmRoomReservation]
  );

  const deleteReservation = useCallback(
    async (id) => {
      try {
        await DeleteReservation(id);
        const updatedReservations = reservations.filter(
          (reservation) => reservation._id !== id
        );
        setReservations(updatedReservations);
        gridApi.setRowData(updatedReservations);
        toast.success("Reservation deleted successfully");
      } catch (error) {
        toast.error("Failed to delete reservation");
        console.error("Error deleting reservation:", error);
      }
    },
    [reservations, gridApi, DeleteReservation]
  );

  const columnDefs = [
    {
      field: "_id",
      headerName: "Reservation ID",
      sortable: true,
      filter: true,
    },
    {
      field: "userId.fullname",
      headerName: "User Name",
      sortable: true,
      filter: true,
    },
    {
      field: "from",
      headerName: "From",
      sortable: true,
      filter: true,
      cellRenderer: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "to",
      headerName: "To",
      sortable: true,
      filter: true,
      cellRenderer: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "roomId.name",
      headerName: "Room Name",
      sortable: true,
      filter: true,
    },
    {
      field: "finalPrice",
      headerName: "Final Price",
      sortable: true,
      filter: true,
      cellRenderer: (params) => `${params.value.toFixed(2)}Da`,
    },
    {
      field: "depositAmount",
      headerName: "deposit",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return `${params?.value?.toFixed(2) || "0"}Da `;
      },
    },
    {
      field: "remainingAmount",
      headerName: "Remainging",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return `${params?.value?.toFixed(2) || "0"}Da `;
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      cellRenderer: StatusCellRenderer,
    },
    {
      headerName: "Actions",
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        updateStatus: updateStatus,
        deleteReservation: deleteReservation,
        userType: user?.type,
      },
      onCellClicked: (params) => {
        // Prevent row selection when clicking on action buttons
        params.event.stopPropagation();
        setSelectedReservation(null);
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="ag-theme-alpine h-[600px] w-full">
        <div className="text-4xl font-raleway font-semibold mb-4">
          Reservation
        </div>
        <div className=" flex justify-between items-center mb-4">
          <div className="sm:flex-col flex text-base text-primary1 items-start space-x-2">
            <div>All reservations ({reservations.length || 0})</div>
            {/* <div>Available Rooms (TBD)</div>
          <div>Booked Rooms (TBD)</div> */}
          </div>
          <div>
            <DownloadButton
              url="https://api.cnsl-tikjda.dz/api/reservation/export"
              title="Download Reservation"
              className="border  bg-transparent border-primary1 text-primary1 hover:bg-primary1  hover:text-white  rounded-full font-bold text-lg"
            />
          </div>
        </div>
        <AgGridReact
          rowData={reservations}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          paginationPageSize={6}
          onGridReady={onGridReady}
          rowHeight={70}
          onRowDoubleClicked={onRowClicked}
        />
      </div>
      {selectedReservation && (
        <ReservationDetailsDialog
          reservation={selectedReservation}
          onClose={closeDialog}
        />
      )}
    </>
  );
}
