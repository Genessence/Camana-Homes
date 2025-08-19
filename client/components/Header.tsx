import React from 'react'
import logo from '../assets/logo-black.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


type Props = {}

const Header = (props: Props) => {
    const navigate = useNavigate();
  return (
    <div className='header' style={{borderBottom: '1px solid #E0E0E0'}}>
        <div className='header-container' style={{display: 'flex', alignItems: 'center', padding: '14px 70px', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={logo} onClick={() => navigate('/')} alt="logo" style={{width: '155px', marginRight: "90px", cursor: 'pointer'}}/>
            {/* <div className='header-leftbox'>
                    <button style={{padding: "14px 21px", border: "1px solid #000", borderRadius: "0px"}}>Buy</button>
                    <button style={{padding: "14px 21px", border: "1px solid #000", borderRadius: "0px"}}>Sell</button>
                    <button style={{padding: "14px 21px", border: "1px solid #000", borderRadius: "0px"}}>Rent</button>
                    <button style={{padding: "14px 21px", border: "1px solid #000", borderRadius: "0px"}}>Mortgage</button>
            </div> */}
            </div>
            <div className='header-rightbox' style={{display: 'flex', alignItems: 'center'}}>
                <button style={{padding: "14px 20px", border: "1px solid #000", borderRadius: "0px", marginRight:"20px"}}>Get Connected</button>
                <button style={{padding: "16px 20px", backgroundColor: "#000", color: "#fff", borderRadius: "0px", marginRight: '20px'}}>Agent Login</button>
                <GiHamburgerMenu style={{fontSize: '20px'}}/>
            </div>
        </div>
        <div className="sub-container" style={{backgroundColor: "rgba(186, 186, 186, 0.15)", padding: "12px", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ul style={{display: 'flex', alignItems: 'center', justifyContent: 'center', listStyle: 'none'}}>
                <li style={{marginRight: '20px'}}>Dubai</li>
                <li style={{marginRight: '20px'}}>Italy</li>
                <li style={{marginRight: '20px'}}>Switerland</li>
                <li style={{marginRight: '20px'}}>Mexico</li>
                <li style={{marginRight: '20px'}}>Australia</li>
                <li style={{marginRight: '20px'}}>South Africa</li>
                <li style={{marginRight: '20px'}}>Germany</li>
                <li style={{marginRight: '20px'}}>Greece</li>
                <li style={{marginRight: '20px'}}>United States</li>
            </ul>
        </div>
    </div>
  )
}

export default Header;