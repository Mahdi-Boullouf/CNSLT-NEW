import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useReservation } from "@/contexts/ReservationContext";

export function DatePickerDialog({ isOpen, onClose, onConfirm }) {
  const { selectedDates, setSelectedDates } = useReservation();

  const isReservationValid = useMemo(
    () => selectedDates.from && selectedDates.to,
    [selectedDates]
  );

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Dates</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between border rounded-lg mb-4">
          {renderDateSection("CHECK-IN", selectedDates.from)}
          {renderDateSection("CHECK-OUT", selectedDates.to)}
        </div>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={selectedDates.from}
          selected={{
            from: selectedDates.from,
            to: selectedDates.to,
          }}
          onSelect={(range) => {
            setSelectedDates({
              from: range?.from,
              to: range?.to,
            });
          }}
          numberOfMonths={2}
        />
        <DialogFooter>
          <button
            className={`w-full mt-4 py-2 text-white rounded-lg ${
              isReservationValid
                ? "bg-primary1"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={!isReservationValid}
          >
            Reserve
          </button>

          <button
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 mt-4 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
