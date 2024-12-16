import React, { useState } from 'react';
import { Dialog } from './ui/dialog';
import { getUrlImage } from '@/lib/assistant';
const FromGallery = ({ images, maxImages = 4 }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const displayedImages = images?.slice(0, maxImages);

  return (
    <section className="py-12">
      <div className="flex md:flex-col flex-row justify-between md:items-start items-center mb-8 font-raleway">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold mb-2 font-body">
            From The Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Aenean nunc urna sit dapis aliquam et sit aliquet dolor do
            amet sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>
    
      </div>
      <div className="grid grid-cols-4 md:grid-cols-2 gap-8">
        {displayedImages?.map((src, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={getUrlImage( src)}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <Dialog onClose={closeDialog}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={getUrlImage( src)}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </Dialog>
      )}
    </section>
  );
};

export default FromGallery;