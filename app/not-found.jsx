import Image from 'next/image';
import Img_404 from '@/public/Img_404.svg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-gray-200">
      <div className="mb-4">
        <Image src={Img_404} alt="404 Not Found" width={400} height={300} />
      </div>
      <p className="text-4xl font-extralight text-primary2  font-raleway ">Cannot find this route!</p>
    </div>
  );
}
