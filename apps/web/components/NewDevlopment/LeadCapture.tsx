import { useState } from 'react';
import { Check } from 'lucide-react';

export default function LeadCapture() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    consent1: true,
    consent2: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="w-full bg-black py-[50px]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-[70px]">
        <div className="flex flex-col lg:flex-row gap-[38px] items-start">
          {/* Left Side - Hero Image */}
          <div className="flex-1 relative">
            <div 
              className="h-[400px] lg:h-[515px] bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0.69) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/ee4f54f91717f23fcfaaa3a252708319be438ee7?width=1416')`
              }}
            >
              {/* Top content */}
              <div className="absolute top-[38px] left-[38px] right-[38px]">
                <p className="text-[#C0C0C0] font-dm-sans text-[24px] md:text-[30px] font-semibold mb-3">
                  Coming in April
                </p>
                <h2 className="text-white font-dm-sans text-[28px] md:text-[35px] font-semibold leading-tight mb-4 max-w-[610px]">
                  New luxury Development on palm Jumeirah
                </h2>
                <p className="text-white font-dm-sans text-[18px] md:text-[23px] font-normal">
                  The last new high-end project on the palm!
                </p>
              </div>
              
              {/* Bottom content */}
              <div className="absolute bottom-[40px] left-[38px] right-[38px]">
                <h3 className="text-white font-dm-sans text-[24px] md:text-[30px] font-semibold max-w-[637px]">
                  Members will get project details 5 days before the official reveal
                </h3>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="w-full lg:w-[713px] flex flex-col gap-[30px]">
            {/* Form Header */}
            <div>
              <h2 className="text-white font-dm-sans text-[28px] md:text-[35px] font-semibold leading-tight mb-4 max-w-[558px]">
                Secure you unit before it hits the market
              </h2>
              <p className="text-white font-dm-sans text-[18px] md:text-[23px] font-normal">
                don't miss this unique opportunity
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-[48px]">
              {/* Input Fields */}
              <div className="flex flex-col gap-8">
                {/* Name Fields Row */}
                <div className="flex flex-col md:flex-row gap-8">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="flex-1 px-[10px] py-[10px] border border-[#CACACA] bg-transparent text-white placeholder-brand-gray-600 font-dm-sans text-[18px] focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="flex-1 px-[10px] py-[10px] border border-[#CACACA] bg-transparent text-white placeholder-brand-gray-600 font-dm-sans text-[18px] focus:outline-none focus:border-white"
                  />
                </div>
                
                {/* Phone Field */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-[10px] py-[10px] border border-[#CACACA] bg-transparent text-white placeholder-brand-gray-600 font-dm-sans text-[18px] focus:outline-none focus:border-white"
                />
                
                {/* Checkboxes */}
                <div className="flex flex-col gap-[10px]">
                  {/* Checkbox 1 */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        name="consent1"
                        checked={formData.consent1}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border ${formData.consent1 ? 'border-brand-red bg-brand-red' : 'border-white bg-transparent'} flex items-center justify-center`}>
                        {formData.consent1 && (
                          <Check className="w-3 h-3 text-white" strokeWidth={2} />
                        )}
                      </div>
                    </div>
                    <span className="text-white font-dm-sans text-[14px] leading-[24px]">
                      Lorem Ipsum is simply dummy text of the printing and
                    </span>
                  </label>
                  
                  {/* Checkbox 2 */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        name="consent2"
                        checked={formData.consent2}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border ${formData.consent2 ? 'border-brand-red bg-brand-red' : 'border-white bg-transparent'} flex items-center justify-center`}>
                        {formData.consent2 && (
                          <Check className="w-3 h-3 text-white" strokeWidth={2} />
                        )}
                      </div>
                    </div>
                    <span className="text-white font-dm-sans text-[14px] leading-[24px]">
                      Lorem Ipsum is simply dummy text of the printing and
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-brand-red text-white py-[18px] px-5 flex items-center justify-center gap-2 font-dm-sans text-[20px] font-bold hover:bg-red-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/911527875a22fedfec1b783a5f8936bf60ffddc3?width=57" 
                    alt="Logo" 
                    className="w-[28px] h-[27px]"
                  />
                  <span>Join our Club</span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
