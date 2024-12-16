import Image from 'next/image';

const HotelCard = ({ imageSrc, rating, name, location }) => {
  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white ">
      <div className="relative">
        <Image 
          src={imageSrc} 
          alt={name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-t-3xl"
        />
        <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 text-sm font-bold shadow">
          {rating}
        </div>
        <button className="absolute top-3 right-3 text-white hover:text-primary1 bg-#BF9445  bg-primary1 hover:bg-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-4">
        <h2 className="font-bold text-xl mb-1">{name}</h2>
        <p className="text-gray-600 text-sm">{location}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-semibold">Voici les détails.</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;