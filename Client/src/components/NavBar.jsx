import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className="shadow-sm shadow-slate-400 p-3 bg-black-bg md:h-14 w-full flex justify-between items-center">
      <h1 className="text-xl md:text-3xl text-white-headline">
        ContactEase
      </h1>
      <ul className="flex gap-4 text-xl">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `transition-all hover:text-orange-400 cursor-pointer ${
              isActive ? 'text-orange-400' : 'text-white'
            }`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `transition-all hover:text-orange-400 cursor-pointer ${
              isActive ? 'text-orange-400' : 'text-white'
            }`
          }
        >
          Contact list
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `transition-all hover:text-orange-400 cursor-pointer ${
              isActive ? 'text-orange-400' : 'text-white'
            }`
          }
        >
          Chat
        </NavLink>
      </ul>
    </nav>
  )
}
