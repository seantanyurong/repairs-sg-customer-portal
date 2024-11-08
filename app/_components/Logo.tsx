import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-4">
      <span className="text-xl font-semibold lg:text-2xl">As Seen On</span>
      <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
        <Image 
          src="/images/channel-news-asia.png" 
          alt="CNA Logo" 
          width={120} 
          height={20} 
          className="w-24 h-auto" 
        />
        <Image 
          src="/images/today.png" 
          alt="Today Logo" 
          width={120} 
          height={20} 
          className="w-24 h-auto"
        />
        <Image 
          src="/images/singsaver.png" 
          alt="SingSaver Logo" 
          width={120} 
          height={20} 
          className="w-24 h-auto"
        />
        <Image 
          src="/images/home-and-decor-singapore.png" 
          alt="Home Decor Logo" 
          width={120} 
          height={20} 
          className="w-24 h-auto"
        />
        <Image 
          src="/images/expat-living.png" 
          alt="Expat Living Logo" 
          width={120} 
          height={20} 
          className="w-24 h-auto"
        />
      </div>
    </div>
  );
}
