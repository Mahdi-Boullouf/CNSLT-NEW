import React from 'react';
import { CgClose } from "react-icons/cg";

const statusStyles = {
  accepted: 'bg-green-100 text-green-800 border-green-300',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  refused: 'bg-red-100 text-red-800 border-red-300',
  default: 'bg-gray-100 text-gray-800 border-gray-300'
};

const ReservationDetailsDialog = ({ reservation, onClose }) => {
  if (!reservation) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-500 p-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Reservation Details</h2>
          <button
            className="text-white hover:bg-blue-600 rounded-full p-1 transition duration-300"
            onClick={onClose}
          >
            <CgClose className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            <InfoSection title="Reservation Info">
              <InfoItem label="ID" value={reservation._id} />
              <InfoItem label="From" value={formatDate(reservation.from)} />
              <InfoItem label="To" value={formatDate(reservation.to)} />
              <InfoItem label="Final Price" value={`$${reservation.finalPrice.toFixed(2)}`} />
              <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusStyles[reservation.status] || statusStyles.default}`}>
                {reservation.status}
              </p>
            </InfoSection>
            
            {reservation.userId && (
              <InfoSection title="User Info">
                <InfoItem label="Name" value={reservation.userId.fullname} />
                <InfoItem label="Email" value={reservation.userId.email} />
                <InfoItem label="Phone" value={reservation.userId.phone} />
                <InfoItem label="Type" value={reservation.userId.type} />
              </InfoSection>
            )}
          </div>
          
          {reservation.roomId && (
            <InfoSection title="Room Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem label="Name" value={reservation.roomId.name} />
                <InfoItem label="Type" value={reservation.roomId.type} />
                <InfoItem label="Price Per Person" value={`$${reservation.roomId.pricePerPerson.toFixed(2)}`} />
                <InfoItem label="Transport" value={reservation.roomId.transport ? 'Yes' : 'No'} />
                <InfoItem label="Danger Degree" value={reservation.roomId.dangerDegree} />
                <InfoItem label="Activities" value={reservation.roomId.activities.join(', ')} />
              </div>
            </InfoSection>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoSection = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      {children}
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <p className="text-gray-700">
    <span className="font-medium">{label}:</span> {value}
  </p>
);

export default ReservationDetailsDialog;