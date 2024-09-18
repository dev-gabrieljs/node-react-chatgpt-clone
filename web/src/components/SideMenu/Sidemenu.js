import React from 'react'
import './Sidemenu.css'
import { FaPlus, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Exemplo de ícones

const SideMenu = () => {
  return (
    <aside className='sidemenu'>
      <div className='sidemenu-button'>
        <FaPlus className='icon' />
        <span>Novo chat</span>
      </div>
      <div className='sidemenu-button'>
        <FaCog className='icon' />
        <span>Configurações</span>
      </div>
      <div className='sidemenu-button'>
        <FaSignOutAlt className='icon' />
        <span>Sair</span>
      </div>
    </aside>
  )
}

export default SideMenu
