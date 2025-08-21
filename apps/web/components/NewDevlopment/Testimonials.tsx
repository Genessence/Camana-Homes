import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Cameron Williamson',
    title: 'Licensed Real Estate',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/5a451a812be4cc9882a67f5c2caff1619b46100a?width=180',
    quote: 'Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dores.'
  },
  {
    id: 2,
    name: 'Esther Howard',
    title: 'Chief Executive Officer / Licensed Real Estate Broker',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/8d1d974913202acf3902a6c1ddfeb84bef3f42b8?width=180',
    quote: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.'
  },
  {
    id: 3,
    name: 'Devon Lane',
    title: 'Director of Luxury Sales / Broker Associate',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/bfd47fdd26ba6e550645fc5552e6347f876b3def?width=180',
    quote: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.'
  }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-white w-full md:w-[447px] h-[310px] relative p-10 flex-shrink-0">
      {/* Avatar */}
      <div className="w-[90px] h-[90px] rounded-full overflow-hidden mb-6">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Name and Title */}
      <div className="mb-6">
        <h3 className="text-black font-dm-sans text-[19px] font-bold mb-1">
          {testimonial.name}
        </h3>
        <p className="text-black font-dm-sans text-[15px] font-normal leading-normal">
          {testimonial.title}
        </p>
      </div>
      
      {/* Quote Icon */}
      <div className="absolute top-10 right-10">
        <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3072_18302)">
            <path d="M9.67883 37.9902C6.64234 37.9902 4.27007 36.9426 2.56204 34.8473C0.854015 32.6569 0 29.4188 0 25.1331C0 20.6569 0.99635 16.3712 2.98905 12.2759C5.07664 8.18071 8.01825 4.13309 11.8139 0.133098C11.9088 0.0378557 12.0511 -0.00976562 12.2409 -0.00976562C12.5255 -0.00976562 12.7153 0.133092 12.8102 0.418808C13 0.609282 13.0474 0.847377 12.9526 1.13309C10.6752 4.18071 9.10949 7.13309 8.25548 9.99023C7.49635 12.7521 7.11679 15.8473 7.11679 19.2759C7.11679 21.8473 7.44891 23.8473 8.11314 25.2759C8.77737 26.7045 9.67883 27.9902 10.8175 29.1331L5.40876 30.1331C5.31387 28.514 5.74088 27.2759 6.68978 26.4188C7.73358 25.5616 9.06205 25.1331 10.6752 25.1331C12.6679 25.1331 14.1861 25.7045 15.2299 26.8473C16.3686 27.9902 16.938 29.5616 16.938 31.5616C16.938 33.6569 16.2737 35.2759 14.9453 36.4188C13.7117 37.4664 11.9562 37.9902 9.67883 37.9902ZM31.5985 37.9902C28.562 37.9902 26.1898 36.9426 24.4818 34.8473C22.8686 32.6569 22.062 29.4188 22.062 25.1331C22.062 20.5616 23.0584 16.2283 25.0511 12.1331C27.0438 8.03786 29.9854 4.03785 33.8759 0.133098C33.9708 0.0378557 34.1131 -0.00976562 34.3029 -0.00976562C34.5876 -0.00976562 34.7774 0.133092 34.8723 0.418808C35.062 0.609282 35.1095 0.847377 35.0146 1.13309C32.7372 4.18071 31.1715 7.13309 30.3175 9.99023C29.5584 12.7521 29.1788 15.8473 29.1788 19.2759C29.1788 21.8473 29.4635 23.895 30.0328 25.4188C30.6971 26.8473 31.5985 28.0854 32.7372 29.1331L27.4708 30.1331C27.3759 28.514 27.8029 27.2759 28.7518 26.4188C29.7007 25.5616 31.0292 25.1331 32.7372 25.1331C34.7299 25.1331 36.2482 25.7045 37.292 26.8473C38.4307 27.9902 39 29.5616 39 31.5616C39 33.6569 38.3358 35.2759 37.0073 36.4188C35.7737 37.4664 33.9708 37.9902 31.5985 37.9902Z" fill="#FD2D15"/>
          </g>
        </svg>
      </div>
      
      {/* Quote */}
      <p className="text-black font-dm-sans text-[17px] font-normal leading-normal">
        {testimonial.quote}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + testimonialsPerView >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - testimonialsPerView) : prev - 1
    );
  };

  return (
    <section className="w-full bg-brand-gray-50 py-[50px]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-[70px]">
        {/* Section Title */}
        <h2 className="text-black font-dm-sans text-[28px] md:text-[35px] font-semibold mb-[30px]">
          Agents Testimonials
        </h2>
        
        {/* Testimonials Container */}
        <div className="relative">
          {/* Desktop View */}
          <div className="hidden md:flex gap-[30px] overflow-hidden">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center justify-center md:justify-end gap-2 mt-8 md:mt-0 md:absolute md:bottom-4 md:right-0">
            <button 
              onClick={prevSlide}
              className="w-[37px] h-[40px] border border-brand-gray-50 bg-black/10 backdrop-blur-sm flex items-center justify-center hover:bg-black/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-[37px] h-[40px] border border-brand-gray-50 bg-black/10 backdrop-blur-sm flex items-center justify-center hover:bg-black/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
