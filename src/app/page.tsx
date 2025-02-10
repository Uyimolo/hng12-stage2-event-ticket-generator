import Image from 'next/image';
import logo from '@/assets/svgs/logo.svg';

export default function Home() {
  return (
    <div className='bg-[#02191D] h-screen w-full p-4'>
      {/* header */}
      <div className='flex items-center justify-between border border-primary p-4 rounded-xl mx-4'>
        <Image src={logo} alt='ticz' />
        <button className='p-4 bg-white text-[#333333] rounded-xl '>
          MY TICKETS{' '}
        </button>
      </div>

      {/* main content */}
    </div>
  );
}
