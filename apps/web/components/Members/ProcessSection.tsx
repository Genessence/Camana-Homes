import { Button } from "@/components/ui/button";

export function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "get in touch with us and submit an application",
      description: "Submit your info, and step into our exclusive club with ease."
    },
    {
      number: "2", 
      title: "tell us your Goals",
      description: "discuss your investments preferences goals and budget with your personal advisor."
    },
    {
      number: "3",
      title: "Unlock Exclusive Access",
      description: "receive a curated properly list early notification and invitation to private events."
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-16">
        <div className="flex items-center justify-center gap-10">
          {/* Left Side - Process */}
          <div className="bg-white/10 p-12 max-w-[700px]">
            {/* Header */}
            <div className="mb-11">
              <h3 className="text-[#C0C0C0] text-[30px] font-semibold leading-normal mb-2">
                3 easy steps
              </h3>
              <h2 className="text-white text-[35px] font-semibold leading-normal max-w-[610px] mb-8">
                Become part of an exclusive network that grants you access
              </h2>
              
              {/* Benefits List */}
              <div className="space-y-4 text-[#8E8E8E] text-xl leading-normal">
                <p>Invitation only developers events</p>
                <p>Full concierge support</p>
                <p>Exclusive pre-market deals</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-[#FD2D15] hover:bg-[#E0250F] text-white h-[50px] px-5 gap-1 font-extrabold text-xl">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=57"
                alt=""
                className="w-7 h-[27px]"
              />
              Become a member
            </Button>
          </div>

          {/* Right Side - Steps */}
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`flex bg-gray-100/20 p-7 h-[150px] ${
                  index === 1 ? 'border-t border-b border-black' : ''
                }`}
              >
                {/* Step Number */}
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-[25px] font-bold uppercase">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h4 className="text-white text-[25px] font-bold leading-normal uppercase mb-3 max-w-[511px]">
                    {step.title}
                  </h4>
                  <p className="text-[#8E8E8E] text-xl leading-normal max-w-[566px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
