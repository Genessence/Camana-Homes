import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 md:px-[70px]">
        <div className="flex items-center justify-between h-[66px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310" 
              alt="Camana Homes" 
              className="h-[43px] w-[155px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0">
            <Link 
              to="/buy" 
              className="px-[21px] py-2 border border-black bg-transparent text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
            >
              Buy
            </Link>
            <Link 
              to="/sell" 
              className="px-[21px] py-2 border border-black border-l-0 bg-transparent text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
            >
              Sell
            </Link>
            <Link 
              to="/rent" 
              className="px-[21px] py-2 border border-black border-l-0 bg-transparent text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
            >
              Rent
            </Link>
            <Link 
              to="/mortgage" 
              className="px-[21px] py-2 border border-black border-l-0 bg-transparent text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
            >
              Mortgage
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link 
              to="/connect" 
              className="px-[21px] py-2 border border-black bg-gray-100/20 text-black text-[14px] font-dm-sans hover:bg-gray-200/30 transition-colors"
            >
              Get Connected
            </Link>
            <Link 
              to="/login" 
              className="px-5 py-2 bg-black text-white text-[14px] font-dm-sans hover:bg-gray-900 transition-colors"
            >
              Agent Login
            </Link>
            <button className="ml-2">
              <Menu className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/buy" 
                className="px-4 py-2 text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy
              </Link>
              <Link 
                to="/sell" 
                className="px-4 py-2 text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link 
                to="/rent" 
                className="px-4 py-2 text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rent
              </Link>
              <Link 
                to="/mortgage" 
                className="px-4 py-2 text-black text-[17px] font-dm-sans hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mortgage
              </Link>
              <div className="pt-3 border-t border-gray-200">
                <Link 
                  to="/connect" 
                  className="block px-4 py-2 text-black text-[14px] font-dm-sans hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Connected
                </Link>
                <Link 
                  to="/login" 
                  className="block px-4 py-2 bg-black text-white text-[14px] font-dm-sans hover:bg-gray-900 transition-colors mt-2 mx-4 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agent Login
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
