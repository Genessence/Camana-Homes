import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[764px] bg-cover bg-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(200deg, rgba(0, 0, 0, 0.00) 39.08%, rgba(0, 0, 0, 0.67) 79.78%), url('https://api.builder.io/api/v1/image/assets/TEMP/3ab0fc1c247d4be7843852d97d25a3c1b2438ab6?width=3200')`
        }}
      />
      
      {/* Navigation Arrows */}
      <div className="absolute bottom-[109px] right-[70px] flex items-center space-x-2">
        <button className="w-[50px] h-[50px] border border-white bg-black/10 backdrop-blur-sm flex items-center justify-center hover:bg-black/20 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button className="w-[50px] h-[50px] border border-white bg-black/10 backdrop-blur-sm flex items-center justify-center hover:bg-black/20 transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-[70px] pb-[109px]">
        <div className="max-w-[537px]">
          <h1 className="text-white font-dm-sans text-[40px] md:text-[54px] font-black leading-tight uppercase mb-8">
            <span className="font-bold">Camana Homes</span><br />
            <span className="font-normal">New Development</span>
          </h1>
          
          <button className="inline-flex items-center space-x-2 bg-white text-black px-5 py-3 hover:bg-gray-100 transition-colors group">
            <span className="text-[14px] font-inter font-medium">Explore our developments</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
