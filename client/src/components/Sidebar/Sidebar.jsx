import React from 'react'
import { sidebarData } from '../../utils/sidebar-data'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <ul>
        {sidebarData.map((e, i) => <li key={i}>
          <NavLink to={`/${e.link}`} className='nav-link' style={isActive => ({
            backgroundColor: isActive ? "#2B564C" : "#fff",
            fill: isActive ? "white" : "#2B564C",
            color: isActive ? "white" : "#2B564C",

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