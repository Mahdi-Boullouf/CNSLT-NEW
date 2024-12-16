import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUrlImage } from '@/lib/assistant';
const SiteCard = ({ _id,images, name, duration, transport, type, rating, reviews }) => {
  const router = useRouter()
  const handelClick =()=>{
    router.push(`reservation/${_id}`)

  }
  return (
    <div className="transform transition duration-500 hover:scale-105 hover:shadow-xl max-w-sm rounded overflow-hidden shadow-lg bg-white" onClick={handelClick}>
      <Image 
        src={getUrlImage(images[0])} 
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
      <h2 className="font-bold text-xl mb-2 line-clamp-2 h-14 overflow-hidden">
          {name}
        </h2>        {/* <div className="flex items-center mb-2">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Duration {duration}</span>
        </div> */}
        {transport && (
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span>Transport Facility</span>
          </div>
        )}
        {type && (
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{type}</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default SiteCard;