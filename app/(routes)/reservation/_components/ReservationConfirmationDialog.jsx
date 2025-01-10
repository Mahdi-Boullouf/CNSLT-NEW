"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

export function ReservationConfirmationDialog({
  isOpen,
  setIsOpen,
  onConfirm,
  isConfirming,
  setIsConfirming,
}) {
  const handleConfirm = async (type) => {
    // event.preventDefault();
    setIsConfirming(true);
    try {
      await onConfirm(type);
      // toast.success("Reservation confirmed successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error confirming reservation. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-lg">
        <DialogTitle>Confirm Your Reservation</DialogTitle>
        <DialogDescription>
          Are you sure you want to confirm this reservation?
        </DialogDescription>
        <div className="mt-6 flex justify-end space-x-4">
          <DialogClose asChild>
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition duration-300">
              Cancel
            </button>
          </DialogClose>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleConfirm("deposit");
            }}
            disabled={isConfirming}
          >
            {isConfirming
              ? "Confirming..."
              : "Payez 20 % pour confirmer la réservation"}
          </button>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleConfirm("full");
            }}
            disabled={isConfirming}
          >
            {isConfirming ? "Confirming..." : "Payez le montant total."}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
