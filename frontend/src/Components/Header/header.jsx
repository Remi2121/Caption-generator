import React from 'react'
import { Link } from 'react-scroll'
import './header.css'

const Header = () => {
  return (
    <div className='header-container'>
      <ul className='navbar'>
        
        <li>
          <Link to="imageCaption" smooth={true} duration={600} offset={-50}>
            Image Caption
          </Link>
        </li>

        <li>
          <Link to="multiLanguage" smooth={true} duration={600} offset={-50}>
            Multi Language
          </Link>
        </li>

        <li>
          <Link to="profileCaption" smooth={true} duration={600} offset={-50}>
            Profile Caption
          </Link>
        </li>

        <li>
          <Link to="aboutUs" smooth={true} duration={600} offset={-50}>
            About Us
          </Link>
        </li>

      </ul>
    </div>
  )
}

export default Header
