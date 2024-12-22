"use client";

import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUrlImage } from "@/lib/assistant";
import { toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";

const ActivitiesCard = ({ data, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

//   const onEdit = () => {
//     router.push(`/dashboard/articles/edit/${data._id}`);
//   };

  const handleDelete = async () => {
    try {
      await onDelete(data._id);
      setIsDeleteModalOpen(false);
      toast.success("Activitie deleted successfully!");
    } catch (error) {
      console.error("Activitie deleting event:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="relative h-48">
          <Image
            src={getUrlImage(data?.picture)}
            alt={data?.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{data?.name}</h3>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center">
      
            <div className="flex gap-2">
              <Button
                className="flex items-center text-white bg-red-500 hover:bg-red-700 transition-colors duration-200"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <DialogHeader>Delete Event</DialogHeader>
          <DialogContent>
            <p>Are you sure you want to delete this event?</p>
            <div>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
          </DialogContent>
          
        </Dialog>
      )}
    </>
  );
};

export default ActivitiesCard;














