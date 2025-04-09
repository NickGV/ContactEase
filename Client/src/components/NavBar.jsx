import { NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import useChat from '../hooks/useChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export const NavBar = () => {
  const { user, handleLogout, handleDeleteUser } = useContext(AuthContext)
  const { chats } = useChat()
  const [showMenu, setShowMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const logoutAndRedirect = async () => {
    await handleLogout()
    setShowMenu(false)
    setMobileMenuOpen(false)
    navigate('/login')
  }

  return (
    <nav className="shadow-sm shadow-slate-400 p-3 bg-black-bg w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl text-white-headline">
          ContactEase
        </h1>

        <button
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={mobileMenuOpen ? faXmark : faBars}
            className="w-6 h-6"
          />
        </button>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-4 items-center">
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `transition-all hover:text-orange-400 cursor-pointer text-lg ${
                isActive ? 'text-orange-400' : 'text-white'
              }`
            }
          >
            Contact list
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `relative transition-all hover:text-orange-400 cursor-pointer text-lg ${
                isActive ? 'text-orange-400' : 'text-white'
              }`
            }
          >
            Chat
            {chats.some((chat) => chat.hasNotification) && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </NavLink>

          <div className="relative">
            <div className='flex gap-2 items-center'>
              <p className="text-white">
                {user?.username}
              </p>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="w-8 h-8 text-white cursor-pointer"
                onClick={toggleMenu}
              />
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={logoutAndRedirect}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-900 rounded-lg p-4 animate-fadeIn">
          <ul className="flex flex-col gap-4">
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `transition-all hover:text-orange-400 cursor-pointer text-lg ${
                  isActive ? 'text-orange-400' : 'text-white'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact list
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `relative transition-all hover:text-orange-400 cursor-pointer text-lg ${
                  isActive ? 'text-orange-400' : 'text-white'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat
              {chats.some((chat) => chat.hasNotification) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </NavLink>

            <div className="border-t border-gray-700 pt-3 mt-2">
              <div className="flex justify-between items-center">
                <p className="text-white">
                  {user?.username}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={logoutAndRedirect}
                    className="px-3 py-1 text-white bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="px-3 py-1 text-white bg-red-700 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </div>
      )}
    </nav>
  )
}
