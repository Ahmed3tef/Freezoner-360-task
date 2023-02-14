import React from 'react'
import { sidebarData } from '../../utils/sidebar-data'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='searchbar'>
      <ul>
        {sidebarData.map((e, i) => <li>
          <NavLink to={`/${e.link}`} className='nav-link' style={isActive => ({
            backgroundColor: isActive ? "#2B564C" : "white",
            color: isActive ? "white" : "#2B564C",
            fill: isActive ? "white" : "#2B564C",

          })} >
            <img src={e.icon} alt={e.text} />
            <span>{e.text}</span>
          </NavLink>
        </li>)}
      </ul>
    </aside>
  )
}

export default Sidebar