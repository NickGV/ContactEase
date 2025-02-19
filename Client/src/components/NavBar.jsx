import { NavLink } from 'react-router-dom'

export const NavBar = ({ activeTab, handleTabChange }) => {
  return (
    <footer className="shadow-sm shadow-slate-400 p-3 bg-black-bg md:h-14 absolute bottom-0 w-full">
          <nav>
            <ul className="flex gap-4 text-xl">
              <NavLink
              to={'/login'} className="transition-all hover:text-orange-400 cursor-pointer">
                  Login
              </NavLink>
              <NavLink
              to={'/contacts'}
                className={`transition-all hover:text-orange-400 cursor-pointer ${
                  activeTab === 'contacts' ? 'text-orange-400' : ''
                }`}
              >
                <button onClick={() => handleTabChange('contacts')}>
                  Contact list
                </button>
              </NavLink>
              <li
                className={`transition-all hover:text-orange-400 cursor-pointer ${
                  activeTab === 'favorites' ? 'text-orange-400' : ''
                }`}
              >
                <button onClick={() => handleTabChange('favorites')}>
                  Favorites
                </button>
              </li>
            </ul>
          </nav>
        </footer>
  )
}
