import { Header } from "@/components/layout"
import { Mail, Linkedin } from "lucide-react"
import soori from "../assets/soori4x.png"
import about1 from "../assets/about1.jpeg"
import about2 from "../assets/about2.jpeg"
import vijayImg from "../assets/vijay.jpeg"
import simarImg from "../assets/simar.jpeg"
import madhurImg from "../assets/madhur.JPEG"

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Header Overlay */}
      <div
        className="relative h-[820px] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%), url('https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg')"
        }}
      >
        <Header variant="transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="container mx-auto px-4 lg:px-16">
            <div className="max-w-4xl pt-24 lg:pt-32">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-[54px] font-black uppercase leading-[1.1] mb-8 drop-shadow-lg" style={{lineHeight: '1.1'}}>
                Discover<br />
                the best assets<br />
                on earth
              </h1>
              <p className="text-white text-base lg:text-lg max-w-3xl leading-relaxed drop-shadow-md">
                Did you know? The best properties in Dubai sell out they ever hit the market did you know? The best
                properties in Dubai sell out they ever hit the market
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Community Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 max-w-4xl">
              <h2 className="text-black text-3xl lg:text-[35px] font-bold mb-6">Our Community</h2>
              <div className="space-y-4">
                <p className="text-black text-xl font-bold">
                A Global Network of Trust
                </p>
                <p className="text-black text-base leading-relaxed">
                At Camana Homes, we are more than just a luxury property platform—we are a community of discerning buyers, visionary investors, and world-class real estate agents. Our ecosystem is built on trust, transparency, and exclusivity, ensuring that every connection made through Camana Homes is meaningful and lasting.
                </p>
                <p className="text-black text-base leading-relaxed">
                We bring together people who believe in quality living, who value security in transactions, and who are passionate about building a lifestyle that transcends borders.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={about1}
                alt="A Global Network of Trust"
                className="w-[300px] h-[300px] rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Community Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-shrink-0 order-2 lg:order-1">
              <img 
                src={about2}
                alt="Connecting People, Places & Possibilities"
                className="w-[300px] h-[300px] rounded-full object-cover"
              />
            </div>
            <div className="flex-1 max-w-4xl order-1 lg:order-2">
              <div className="space-y-4">
                <h3 className="text-black text-3xl font-bold">
                    Connecting People, Places &amp; Possibilities
                </h3>
                <p className="text-black text-base leading-relaxed">
                    Our platform is designed to simplify luxury real estate discovery and investment. Whether you’re searching for a dream home, a profitable investment, or a holiday retreat, Camana Homes connects you with verified listings and trusted partners worldwide.
                </p>
                <p className="text-black text-base leading-relaxed">
                    We empower agents with global reach while giving buyers access to the world’s most exclusive properties—all in one seamless experience. Together, we are shaping a new era of real estate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-16">
          <h2 className="text-black text-3xl lg:text-[35px] font-bold mb-12">A one of a kind Luxury Properties Platform</h2>
          
          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
              <div className="text-brand-red text-6xl sm:text-8xl lg:text-[116px] font-bold leading-none flex-shrink-0 lg:w-32 text-right lg:-translate-x-5" style={{ color:"#FD2D15"}}>1</div>
              <div className="flex-1 lg:pt-4">
                <h3 className="text-black text-xl font-bold mb-2">
                    A Global Luxury Marketplace
                </h3>
                <p className="text-black text-base leading-relaxed">
                    Camana Homes is redefining how the world discovers and invests in luxury real estate. Our platform brings together the most exclusive, verified properties across continents—making it easier than ever for buyers, investors, and agents to connect seamlessly on a trusted global stage.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
              <div className="text-brand-red text-6xl sm:text-8xl lg:text-[116px] font-bold leading-none flex-shrink-0 lg:w-32 text-right" style={{ color:"#FD2D15"}}>2</div>
              <div className="flex-1 lg:pt-4">
                <h3 className="text-black text-xl font-bold mb-2">
                    Verified &amp; Curated Listings
                </h3>
                <p className="text-black text-base leading-relaxed">
                    We believe luxury demands authenticity. Every property on Camana Homes undergoes a strict verification process, ensuring transparency, trust, and accuracy. Our curated collection eliminates the noise, giving you direct access to only the finest homes, holiday retreats, and investment opportunities.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
              <div className="text-brand-red text-6xl sm:text-8xl lg:text-[116px] font-bold leading-none flex-shrink-0 lg:w-32 text-right" style={{ color:"#FD2D15"}}>3</div>
              <div className="flex-1 lg:pt-4">
                <h3 className="text-black text-xl font-bold mb-2">
                    Built for Agents &amp; Buyers Alike
                </h3>
                <p className="text-black text-base leading-relaxed">
                    Camana Homes isn’t just a platform—it’s a smart ecosystem. From powerful listing tools to global marketing reach, we simplify the lives of agents, while offering buyers a world-class experience in exploring dream homes. Our mission is simple: to make luxury real estate discovery as seamless as booking a flight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-brand-red py-20" style={{backgroundColor: "#FD2D15"}}>
        <div className="container mx-auto px-4 lg:px-16 text-center">
          <h2 className="text-white text-3xl lg:text-[45px] font-bold uppercase mb-8">
            I didn't want to leave ever<br />
            blown away.
          </h2>
          <div className="flex justify-center">
            <img 
              src={soori} 
              alt="Logo" 
              className="h-14"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="relative py-20 lg:py-32"
        style={{
          backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0.69) 100%), url('https://images.pexels.com/photos/128304/pexels-photo-128304.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-[35px] font-bold leading-tight drop-shadow-lg mb-4 lg:mb-0">
                Get Weekly travel inspiration.<br />
                Exclusive offer and early access to<br />
                our new homes.
              </h2>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[500px] xl:min-w-[600px]">
              <div className="flex flex-col sm:flex-row border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-white placeholder-white/80 px-6 py-4 text-lg focus:outline-none"
                />
                <button className="bg-brand-red text-white px-8 py-4 flex items-center justify-center gap-2 whitespace-nowrap hover:bg-red-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg font-bold">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="mb-12">
            <h2 className="text-black text-3xl lg:text-[35px] font-bold mb-6">BEYOND BORDERS, SEAMLESS CONNECTIONS</h2>
            <p className="text-gray-500 text-lg max-w-5xl leading-relaxed">
                At Camana Homes, we believe luxury real estate should be borderless—accessible, verified, and effortless. From beachfront villas and city penthouses to private island retreats, our platform connects you to the world’s most exclusive properties with trust, transparency, and technology at the core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8">
              <div className="text-brand-red text-[40px] font-medium mb-2">$100 M +</div>
              <div className="text-black text-xl font-medium">Verified listings</div>
            </div>
            <div className="bg-gray-100 p-8">
              <div className="text-brand-red text-[40px] font-medium mb-2">10 +</div>
              <div className="text-black text-xl font-medium">Global Markets</div>
            </div>
            <div className="bg-gray-100 p-8">
              <div className="text-brand-red text-[40px] font-medium mb-2">100 +</div>
              <div className="text-black text-xl font-medium">Elite agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="mb-12">
            <h2 className="text-black text-3xl lg:text-[35px] font-bold mb-4">Meet The Awesome Team</h2>
            <p className="text-black text-base">
              Did you know? The best properties in Dubai sell out they ever hit the market did you know? The best properties in Dubai sell out they ever hit the market
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="group relative w-[260px] h-[400px] overflow-hidden rounded-lg shadow-sm">
              <img
                src={vijayImg}
                alt="Vijay Singh - Founder & CEO"
                className="w-full h-full object-cover transition-transform duration-300 ease-out scale-150 group-hover:scale-160 object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 ease-out"></div>
              <div className="absolute inset-x-0 bottom-0 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-bold">Vijay Singh</h3>
                <p className="text-white/90 text-sm">Founder & CEO</p>
                <a href="https://www.linkedin.com/in/vjkumar07" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-2 text-white mt-3">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative w-[260px] h-[400px] overflow-hidden rounded-lg shadow-sm">
              <img
                src={madhurImg}
                alt="Madhur Sinha - Founder & COO"
                className="w-full h-full object-cover transition-transform duration-300 ease-out scale-125 group-hover:scale-135 object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 ease-out"></div>
              <div className="absolute inset-x-0 bottom-0 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-bold">Madhur Sinha</h3>
                <p className="text-white/90 text-sm">Founder & COO</p>
                <a href="https://www.linkedin.com/in/madhur-sinha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-2 text-white mt-3">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative w-[260px] h-[400px] overflow-hidden rounded-lg shadow-sm">
              <img
                src={simarImg}
                alt="Simerpreet Singh - Investor Relations - Europe"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 ease-out"></div>
              <div className="absolute inset-x-0 bottom-0 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-bold">Simerpreet Singh</h3>
                <p className="text-white/90 text-sm">Investor Relations - Europe</p>
                <a href="https://www.linkedin.com/in/simerpreet-singh-00b61b157" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-2 text-white mt-3">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
