import React, { useState } from 'react'


import notificationIocn from '../../assets/images/bell.svg';
import LogoImg from '../../assets/images/logo.png';
import SidebarIconImg from '../../assets/images/nav-menu.svg';
import { Icon } from '..';
import SearchBar from '../SearchBar/SearchBar';
import NotificationIcon from '../icon/NotificationIcon';
import messagesIcon from '../../assets/images/Message ICon.svg';
import langIcon from '../../assets/images/Globe icon.svg';
import userImage from '../../assets/images/292994477_1955029448033311_3310727954892053758_n.jpg'
// import './_navbar.scss';

const Navbar = ({ hideSidebarHandler }) => {

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = e => {
    // code of enter key
    dispatch(loadSearchReferences({
      categoryId,
      params: { keyword: searchValue }
    }))
  };

  return (
    <nav className='nav'>

      <div className="mr-[1rem] lg:mr-[4rem] flex items-center gap-[1rem] lg:gap-[3rem]">

        <img src={LogoImg} alt="logo" className="logo" />
        <Icon>

          <img src={SidebarIconImg} alt="logo" className="logo" />
        </Icon>
      </div>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} placeholder={'Search'} />


      <div className="flex gap-[1rem] lg:gap-[4rem] items-center ml-auto">

        <Icon>

          <img src={langIcon} alt="logo" className="logo" />
        </Icon>
        <Icon>

          <img src={messagesIcon} alt="logo" className="logo" />
        </Icon>
        <NotificationIcon />
        <div className="nav-user">
          <img src={userImage} alt="user" />
          <div className="user-info">
            <h3>Omar El Sayed</h3>
            <p>Technical Department</p>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar