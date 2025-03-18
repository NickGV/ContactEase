import { NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import useChat from '../hooks/useChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export const NavBar = () => {
  const { user, handleLogout, handleDeleteUser } = useContext(AuthContext)
  const { chats } = useChat()
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  console.log(chats)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const logoutAndRedirect = async () => {
    await handleLogout()
    navigate('/login')
  }

  return (
    <nav className="shadow-sm shadow-slate-400 p-3 bg-black-bg md:h-14 w-full flex justify-between items-center">
      <h1 className="text-xl md:text-3xl text-white-headline">
        ContactEase
      </h1>
      <ul className="flex gap-4 text-xli items-center justify-center">
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `transition-all hover:text-orange-400 cursor-pointer text-xl ${
              isActive ? 'text-orange-400' : 'text-white'
            }`
          }
        >
          Contact list
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `relative transition-all hover:text-orange-400 cursor-pointer text-xl ${
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
            <div className='flex  gap-1 items-center'>
            <p>
              {user?.username}
            </p>
            <FontAwesomeIcon
              icon={faUserCircle}
              className="w-10 h-10 text-white cursor-pointer"
              onClick={toggleMenu}
            />
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
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
    </nav>
  )
}
