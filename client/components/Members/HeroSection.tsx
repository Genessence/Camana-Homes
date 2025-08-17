import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-white/10 py-10">
      <div className="container mx-auto px-16">
        <div className="max-w-6xl mx-auto text-center space-y-5">
          {/* Subtitle */}
          <p className="text-white text-base leading-6 -tracking-[0.32px] max-w-[1190px] mx-auto">
            did you know? The best properties in Dubai sell out they ever hit the market
          </p>

          {/* Main Heading */}
          <h1 className="text-white text-[47px] font-bold leading-normal uppercase tracking-tight">
            join private real estate investor club
          </h1>

          {/* CTA Button */}
          <Button className="bg-[#FD2D15] hover:bg-[#E0250F] text-white h-[50px] px-5 gap-1 font-extrabold text-xl">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=57"
              alt=""
              className="w-7 h-[27px]"
            />
            Join our Club
          </Button>

          {/* Bottom Text */}
          <p className="text-white text-base leading-6 -tracking-[0.32px] max-w-[1190px] mx-auto">
            join our member-only investor network for free!
          </p>
        </div>
      </div>
    </section>
  );
}
