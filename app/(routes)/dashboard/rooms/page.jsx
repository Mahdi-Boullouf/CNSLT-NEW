"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Loading from "@/components/ui/Loading";
import { AgGridReact } from "ag-grid-react";
import { DatePickerDialog } from "./components/DatePickerDialog";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useGetAllRooms } from "@/hooks/useFetchRoom";
import { Pencil, Plus, Trash } from "lucide-react";
import Error from "@/components/ui/Error";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeleteRoom } from "@/hooks/useFetchRoom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { TbReservedLine } from "react-icons/tb";
import { useCreateReservation } from "@/hooks/useFetchReservation";
import { useReservation } from "@/contexts/ReservationContext";
import { format } from "date-fns";

const ActionCellRenderer = ({ data, onEdit }) => {
  const { createAdminReservation } = useCreateReservation();
  const { selectedDates } = useReservation();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const toggleDatePicker = () => setIsDatePickerOpen(!isDatePickerOpen);

  const router = useRouter();
  const { deleteRoom } = useDeleteRoom();
  const handleDeleteRoom = async (roomId) => {
    try {
      const res = await deleteRoom({ roomId: roomId });
      if (res) {
        toast.success("Room deleted successfully!");
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room._id !== roomId)
        );
      } else {
        toast.error("Failed to delete the room. Please try again.");
      }
    } catch (error) {
      toast.error("Error deleting room: " + error.message);
    }
  };
  const handleReserveRoom = async (roomId) => {
    try {
      const result = await createAdminReservation({
        roomId,
        from: format(selectedDates.from, "yyyy-MM-dd"),
        to: format(selectedDates.to, "yyyy-MM-dd"),
        paymentType: "full",
      });

      toast.success(result.message);
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.response?.data?.message || "Failed to create reservation"
      );
    }
  };

  return (
    <div className="flex items-center justify-center p-2">
      {data.status !== 0 && (
        <button
          onDoubleClick={toggleDatePicker}
          className="text-black flex items-center border px-2 py-1 text-sm rounded mr-2 bg-yellow-500 hover:bg-opacity-60 active:bg-blue-200"
        >
          <TbReservedLine className="h-4 w-4 text-white" />
          <DatePickerDialog
            isOpen={isDatePickerOpen}
            onClose={() => setIsDatePickerOpen(false)}
            onConfirm={() => handleReserveRoom(data._id)}
          />
        </button>
      )}
      <button
        onDoubleClick={() => onEdit(data._id)}
        className="text-black flex items-center border px-2 py-1 text-sm rounded mr-2 bg-blue-500 hover:bg-opacity-60 active:bg-blue-200"
      >
        <Pencil className="h-4 w-4 text-white" />
      </button>
      <button
        onDoubleClick={() => handleDeleteRoom(data._id)}
        className="text-black flex items-center border px-2 py-1 text-sm rounded mr-2 bg-red-500 hover:bg-opacity-60 active:bg-blue-200"
      >
        <Trash className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};

export default function RoomsTable() {
  const { areaId } = useAuth();
  const {
    data: initialRooms,
    error,
    isLoading,
    getAllRooms,
  } = useGetAllRooms();
  const [rooms, setRooms] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getAllRooms({ areaId: areaId });
  }, [areaId]);

  useEffect(() => {
    if (initialRooms) {
      // Transform rooms to split price into whole and decimal parts
      const transformedRooms = initialRooms.map((room) => {
        // Convert to string and split decimal part
        const priceString = room.pricePerPerson.toString();
        const [wholePart, decimalPart] = priceString.split(".");

        // Custom decimal price extraction
        let modifiedDecimalPrice = "";
        if (decimalPart) {
          // Remove trailing zeros
          const trimmedDecimal = decimalPart.replace(/0+$/, "");

          if (trimmedDecimal.length > 5) {
            // If more than 5 digits, take first 5
            modifiedDecimalPrice = trimmedDecimal.slice(0, 5);
          } else if (trimmedDecimal.length > 0) {
            // If 1-5 digits, keep as is
            modifiedDecimalPrice = trimmedDecimal;
          }
        }

        return {
          ...room,
          wholePrice: Math.floor(room.pricePerPerson),
          decimalPrice: modifiedDecimalPrice,
        };
      });
      setRooms(transformedRooms);
    }
  }, [initialRooms]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleEdit = useCallback(
    (id) => {
      router.push(`/dashboard/rooms/edit/${id}`);
    },
    [router]
  );

  const columnDefs = useMemo(
    () => [
      { field: "_id", headerName: "Room ID", sortable: true, filter: true },
      { field: "name", headerName: "Name", sortable: true, filter: true },
      { field: "type", headerName: "Type", sortable: true, filter: true },
      {
        field: "transport",
        headerName: "Transport",
        sortable: true,
        filter: true,
        cellRenderer: (params) => (params.value ? "Yes" : "No"),
      },
      {
        field: "wholePrice",
        headerName: "prix",
        sortable: true,
        filter: true,
        valueFormatter: (params) => `${params.value} DA`,
      },
      {
        field: "decimalPrice",
        headerName: "La vision",
        sortable: true,
        filter: true,
        valueFormatter: (params) =>
          params.value == 1 ? `Disponible` : `Indisponible`,
      },
      {
        field: "reservations",
        headerName: "Reservations",
        sortable: true,
        filter: true,
        valueGetter: (params) => params.data.reservations.length,
        valueFormatter: (params) => `${params.value} bookings`,
      },
      {
        headerName: "Actions",
        cellRenderer: ActionCellRenderer,
        cellRendererParams: {
          onEdit: handleEdit,
          setRoom: setRooms,
        },
      },
    ],
    [handleEdit]
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
    }),
    []
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  const handleAddRoomClick = () => {
    router.push("rooms/addroom");
  };
  return (
    <div className="ag-theme-alpine h-[600px]">
      <div className="text-4xl font-raleway font-semibold mb-4">Rooms</div>
      <div className=" flex justify-between items-center mb-4">
        <div className="sm:flex-col flex text-base text-primary1 items-start space-x-2">
          <div>All Rooms ({rooms.length || 0})</div>
          <div>Available Rooms (TBD)</div>
          <div>Booked Rooms (TBD)</div>
        </div>
        <div>
          <Button
            onClick={handleAddRoomClick}
            className="border  bg-transparent border-primary1 text-primary1 hover:bg-primary1  hover:text-white  rounded-full font-bold text-lg"
          >
            <Plus className="w-8" />
            Add a New Room
          </Button>
        </div>
      </div>

      <AgGridReact
        rowData={rooms}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={6}
        onGridReady={onGridReady}
        rowHeight={70}
      />
    </div>
  );
}
