import React from 'react'
import { sidebarData } from '../../utils/sidebar-data'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <ul>
        {sidebarData.map((e, i) => <li key={i}>

          <img src={e.icon} className='fill-inherit text-white' />
          <span>{e.text}</span>

        </li>)}
      </ul>
    </aside>
  )
}

export default Sidebar