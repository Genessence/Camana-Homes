import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function ContactSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-16">
        <div className="flex items-center justify-center gap-10">
          {/* Left Side - Image */}
          <div 
            className="w-[700px] h-[500px] relative bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0.69) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/ee4f54f91717f23fcfaaa3a252708319be438ee7?width=1416')`
            }}
          >
            <div className="absolute inset-0 p-10 flex flex-col justify-between">
              {/* Top Content */}
              <div className="space-y-4">
                <h3 className="text-[#C0C0C0] text-[30px] font-semibold leading-normal">
                  Coming in April
                </h3>
                <h2 className="text-white text-[35px] font-semibold leading-normal max-w-[610px]">
                  New luxury Development on palm Jumeirah
                </h2>
                <p className="text-white text-[23px] leading-normal">
                  The last new high-end project on the palm!
                </p>
              </div>

              {/* Bottom Content */}
              <div>
                <p className="text-white text-[30px] font-semibold leading-normal max-w-[637px]">
                  Members will get project details 5 days before the official reveal
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-[713px] space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <h2 className="text-white text-[35px] font-semibold leading-normal max-w-[558px]">
                Secure you unit before it hits the market
              </h2>
              <p className="text-white text-[23px] leading-normal">
                don't miss this unique opportunity
              </p>
            </div>

            {/* Form */}
            <div className="space-y-12">
              {/* Input Fields */}
              <div className="space-y-8">
                {/* Name Fields Row */}
                <div className="flex gap-8">
                  <Input
                    placeholder="Your Name"
                    className="flex-1 h-14 bg-transparent border border-[#CACACA] text-white placeholder:text-[#848484] text-lg px-2.5"
                  />
                  <Input
                    placeholder="Your Name"
                    className="flex-1 h-14 bg-transparent border border-[#CACACA] text-white placeholder:text-[#848484] text-lg px-2.5"
                  />
                </div>

                {/* Phone Field */}
                <Input
                  placeholder="Phone Number"
                  className="h-14 bg-transparent border border-[#CACACA] text-white placeholder:text-[#848484] text-lg px-2.5"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-8">
                  <Checkbox 
                    id="terms1"
                    className="w-5 h-5 border border-[#FD2D15] bg-[#FD2D15] data-[state=checked]:bg-[#FD2D15] data-[state=checked]:border-[#FD2D15]"
                    defaultChecked
                  />
                  <label 
                    htmlFor="terms1" 
                    className="text-white text-sm leading-6 -tracking-[0.32px] max-w-[336px]"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                  </label>
                </div>

                <div className="flex items-center gap-8">
                  <Checkbox 
                    id="terms2"
                    className="w-5 h-5 border border-white bg-transparent data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <label 
                    htmlFor="terms2" 
                    className="text-white text-sm leading-6 -tracking-[0.32px] max-w-[336px]"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-[#FD2D15] hover:bg-[#E0250F] text-white h-[50px] px-5 gap-1 font-extrabold text-xl">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/911527875a22fedfec1b783a5f8936bf60ffddc3?width=57"
                  alt=""
                  className="w-7 h-[27px]"
                />
                Join our Club
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
