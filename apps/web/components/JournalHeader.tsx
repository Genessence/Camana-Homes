import React from "react";
import logo from "../assets/logo-black.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function JournalHeader() {
  const navigate = useNavigate();
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);

  return (
    <div className='header' style={{borderBottom: '1px solid #E0E0E0'}}>
      <div className='header-container' style={{display: 'flex', alignItems: 'center', padding: '14px 70px', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={logo} onClick={() => navigate('/')} alt="logo" style={{width: '155px', marginRight: "90px", cursor: 'pointer'}}/>
        </div>
        <div className='header-rightbox' style={{display: 'flex', alignItems: 'center'}}>
          <button style={{padding: "14px 20px", border: "1px solid #000", borderRadius: "0px", marginRight:"20px"}}>Get Connected</button>
          <button style={{padding: "16px 20px", backgroundColor: "#000", color: "#fff", borderRadius: "0px", marginRight: '20px'}}>Agent Login</button>
          <GiHamburgerMenu style={{fontSize: '20px'}}/>
        </div>
      </div>
      <div className="sub-container" style={{backgroundColor: "rgba(186, 186, 186, 0.15)", padding: "12px", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ul style={{display: 'flex', alignItems: 'center', justifyContent: 'center', listStyle: 'none', position: 'relative'}}>
          <li
            style={{marginRight: '20px', cursor: 'pointer'}}
            onClick={() => navigate('/properties')}
          >
            Luxury Homes
          </li>
          <li
            style={{marginRight: '20px', cursor: 'pointer'}}
            onClick={() => navigate('/properties')}
          >
            Branded Residences
          </li>
          <li
            style={{marginRight: '20px', cursor: 'pointer'}}
            onClick={() => navigate('/new-development')}
          >
            New Developments
          </li>
          <li
            style={{marginRight: '20px', cursor: 'pointer'}}
            onClick={() => navigate('/members-club')}
          >
            Camana Trips
          </li>
          <li
            style={{marginRight: '20px', position: 'relative', cursor: 'pointer'}}
            onClick={() => setIsMoreOpen((o) => !o)}
          >
            More
            {isMoreOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  padding: '8px 0',
                  zIndex: 20,
                  minWidth: '180px',
                }}
              >
                <div
                  onClick={() => { setIsMoreOpen(false); navigate('/about-us'); }}
                  style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}
                >
                  About Us
                </div>
                <div
                  onClick={() => { setIsMoreOpen(false); navigate('/journal'); }}
                  style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}
                >
                  Journal
                </div>
                <div
                  onClick={() => { setIsMoreOpen(false); navigate('/members-club'); }}
                  style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}
                >
                  Members Club
                </div>
                <div
                  onClick={() => { setIsMoreOpen(false); navigate('/properties'); }}
                  style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}
                >
                  All Properties
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}


