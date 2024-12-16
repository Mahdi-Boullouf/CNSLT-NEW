import React, { useMemo, useState } from "react";
import { format, differenceInDays, isWithinInterval } from "date-fns";
import { useReservation } from "@/contexts/ReservationContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { ReservationConfirmationDialog } from "./ReservationConfirmationDialog";
import { useCreateReservation } from "@/hooks/useFetchReservation";
import toast from "react-hot-toast";
import DialogPaymentReservation from "@/components/DialogPaymentReservation";

const ReservationCard = ({ room, season, price }) => {
  console.log("price : ", price);
  
  const { id: roomId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { selectedDates, guests, setGuests } = useReservation();
  const { createReservation } = useCreateReservation();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  const numberOfNights = useMemo(
    () =>
      selectedDates.from && selectedDates.to
        ? differenceInDays(selectedDates.to, selectedDates.from) + 1
        : 0,
    [selectedDates]
  );
  
  const total = price * numberOfNights;

  // Function to validate reservation dates
  const isValidReservationPeriod = (from, to) => {
    let validPeriods;
    
    // Validate for 'in' season
    if (season === 'in') {
      validPeriods = [
        {
          start: new Date(from.getFullYear(), 3, 1),  // April 1st
          end: new Date(from.getFullYear(), 5, 15)   // June 15th
        },
        {
          start: new Date(from.getFullYear(), 8, 1),  // September 1st
          end: new Date(from.getFullYear(), 11, 14)  // December 14th
        }
      ];
    } 
    // Validate for 'out' season
    else {
      validPeriods = [
        {
          start: new Date(from.getFullYear(), 11, 15),  // December 15th
          end: new Date(from.getFullYear() + 1, 2, 30)  // March 30th (next year)
        },
        {
          start: new Date(from.getFullYear(), 6, 15),  // July 15th
          end: new Date(from.getFullYear(), 9, 30)    // October 30th
        }
      ];
    }
    
    // Check if both start and end dates are within any of the valid periods
    return validPeriods.some(period => 
      isWithinInterval(from, period) && isWithinInterval(to, period)
    );
  };

  const isReservationValid = useMemo(
    () => 
      selectedDates.from && 
      selectedDates.to && 
      isValidReservationPeriod(selectedDates.from, selectedDates.to),
    [selectedDates, season]
  );

  const handleReserve = () => {
    if (!user) router.push("/login");
    else if (isReservationValid) setIsConfirmationOpen(true);
    else {
      if (season === 'in') {
        toast.error("In-season reservations are only allowed from April 1 to June 15 and September 1 to December 14");
      } else {
        toast.error("Out-season reservations are only allowed from December 15 to March 30 and July 15 to October 30");
      }
    }
  };

  const handleConfirmReservation = async (event) => {
    event.preventDefault();
    setIsConfirming(true);
    try {
      const result = await createReservation({
        roomId,
        from: format(selectedDates.from, "yyyy-MM-dd"),
        to: format(selectedDates.to, "yyyy-MM-dd"),
      });

      toast.success(result.message);

      // Store reservation details for payment dialog
      setReservationDetails({
        roomId,
        from: format(selectedDates.from, "yyyy-MM-dd"),
        to: format(selectedDates.to, "yyyy-MM-dd"),
        total,
      });

      // Close confirmation dialog
      setIsConfirmationOpen(false);

      // Open payment dialog
      setIsPaymentOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create reservation");
    } finally {
      setIsConfirming(false);
    }
  };

  const renderDateSection = (type, date) => (
    <div
      className={`p-2 flex flex-col justify-center text-sm w-1/2 ${
        !date ? "text-red-500" : "text-gray-600"
      } ${type === "CHECK-IN" ? "border-r-2 border-gray-300" : ""}`}
    >
      <span className="text-black font-bold text-xs">{type}</span>
      <span>{date ? format(date, "MM/dd/yyyy") : "Select date"}</span>
    </div>
  );

  return (
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-md w-[80%] h-full">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">
          {price}
          <span className=" text-gray-500 text-sm">DA</span> / night
        </div>
      </div>
      <div className="my-4 border-t border-gray-200"></div>

      <div className="border-gray-300 border-2 rounded-lg">
        <div className="flex justify-between">
          {renderDateSection("CHECK-IN", selectedDates.from)}
          {renderDateSection("CHECKOUT", selectedDates.to)}
        </div>
      </div>

      <button
        className={`w-full mt-4 py-2 text-white rounded-lg ${
          isReservationValid ? "bg-primary1" : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={handleReserve}
        disabled={!isReservationValid}
      >
        Reserve
      </button>

      <div className="mt-2 text-sm text-gray-500 text-center">
        {season === 'in' 
          ? "In-season: April 1 to June 15 and September 1 to December 14" 
          : "Out-season: December 15 to March 30 and July 15 to October 30"}
      </div>
      <div className="my-4 border-t border-gray-200"></div>
      <div className="text-sm">
        <div className="flex justify-between">
          <span>
            {price} × {numberOfNights} nights
          </span>
          <span>{price * numberOfNights}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>
            {numberOfNights === 0 ? 0 : total}
            <span className=" text-gray-500 text-sm">DA</span>
          </span>
        </div>
      </div>

      <ReservationConfirmationDialog
        onConfirm={handleConfirmReservation}
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        setIsConfirming={setIsConfirming}
        isConfirming={isConfirming}
      />

      <DialogPaymentReservation
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
      />
    </div>
  );
};

export default ReservationCard;