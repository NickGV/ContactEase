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
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

export const NavBar = () => {
  const { user, handleLogout, handleDeleteUser } = useContext(AuthContext)
  const { chats } = useChat()
  const [showMenu, setShowMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (showMenu) setShowMenu(false)
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  // Cerrar el menú móvil al cambiar de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cerrar el menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const logoutAndRedirect = async () => {
    await handleLogout()
    setShowMenu(false)
    navigate('/login')
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-[1000] p-2 rounded-lg bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
        aria-label="Menú"
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="text-lg" />
      </button>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-[999] transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}

      {/* Navigation bar */}
      <nav
        className={`h-screen w-[280px] bg-white fixed left-0 top-0 flex flex-col shadow-2xl border-r border-gray-200 z-[1001] transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
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

        {user && (
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <div
                className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="w-6 h-6 text-gray-600 mr-2"
                />
                <span className="text-gray-700 font-medium truncate">
                  {user?.username}
                </span>
              </div>

              {showMenu && (
                <div className="absolute bottom-full left-0 mb-1 w-full bg-white rounded-md shadow-lg py-1 z-[1010] border border-gray-100">
                  <button
                    onClick={logoutAndRedirect}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-left transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
