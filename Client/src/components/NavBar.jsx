import { NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import useChat from '../hooks/useChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faSignOutAlt,
  faTrashAlt,
  faHome,
  faAddressBook,
  faComments,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export const NavBar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, handleLogout, handleDeleteUser } = useContext(AuthContext)
  const { chats } = useChat()
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMobileMenuOpen])

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false)
  }


  return (
    <>
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-[999] transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}
      <nav
        className={`h-screen w-[280px] bg-white fixed left-0 top-0 flex flex-col shadow-2xl border-r border-gray-200 z-[1001] transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 md:h-16 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            ContactChat
          </h1>
          <button
            onClick={closeMenu}
            className="md:hidden text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Cerrar menú"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        <div className="flex-1 flex flex-col py-4 md:py-6 overflow-y-auto gap-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 md:px-6 py-3 text-base rounded-lg transition-colors duration-200 ${
                isActive ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={handleNavLinkClick}
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-1.5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 md:px-6 py-3 text-base rounded-lg transition-colors duration-200 ${
                isActive ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={handleNavLinkClick}
          >
            <FontAwesomeIcon icon={faAddressBook} className="w-5 h-5 mr-1.5" />
            <span>Contactos</span>
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 md:px-6 py-3 text-base rounded-lg transition-colors duration-200 ${
                isActive ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={handleNavLinkClick}
          >
            <FontAwesomeIcon icon={faComments} className="w-5 h-5 mr-1.5" />
            <span>Chat</span>
            {chats.some((chat) => chat.hasNotification) && (
              <span className="absolute top-3 left-4 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired
}
