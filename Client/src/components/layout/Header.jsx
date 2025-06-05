import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import PropTypes from 'prop-types'
import { NavBar } from './NavBar'

export const Header = ({ onMenuClick, mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, handleLogout, handleDeleteUser } = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState(false)

  const logoutAndRedirect = async () => {
    await handleLogout()
    setShowMenu(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow  flex items-center justify-between px-4 md:px-8 border-b border-gray-200">
      <button
        className="md:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>
      <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight select-none">ContactChat</h1>
      <div className="relative">
        <button
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
          onClick={() => setShowMenu((v) => !v)}
          aria-label="Perfil"
        >
          <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
          <span className="hidden md:inline font-medium">{user?.username}</span>
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[1200] border border-gray-100">
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
      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </header>
  )
}

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired
}
