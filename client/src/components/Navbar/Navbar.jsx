import React from 'react'
import {
  MdMenu,
  MdSearch,
  MdMic,
  MdVideoCall,
  MdOutlineNotifications,
  MdAccountCircle,
} from 'react-icons/md';

import LogoImg from '../../assets/images/logo.png';
import { Icon } from '..';
// import './_navbar.scss';

const Navbar = ({ hideSidebarHandler }) => {
  return (
    <nav className='sticky top-0 left-0 z-50 w-[100%] bg-white h-[12.5rem]'>
      {/* <div className='navbar__container'>
        <div className='logo'>
          <img src={LogoImg} alt='logo' className='logo__img' />

        </div>
        <div className='navbar__menuLogoContainer'>
          <div
            className='navbar__menuIcon'
            onClick={() => {
              hideSidebarHandler();
            }}>
            <MdMenu />
          </div>
        </div>

        <div className='searchBar'>
          <input
            placeholder='Search'
            className='searchBar__input'
            type='text'
          />
          <Icon className='searchBar__searchIcon'>
            <MdSearch />
          </Icon>
          <Icon className='searchBar__micIcon'>
            <MdMic />
          </Icon>
        </div>
        <div className='contentContainer'>
          <Icon>
            <MdVideoCall />
          </Icon>
          <Icon>
            <MdOutlineNotifications />
          </Icon>
          <Icon>
            <MdAccountCircle />
          </Icon>
        </div>
      </div> */}
      <img src={LogoImg} alt="logo" className="logo" />
    </nav>
  )
}

export default Navbar