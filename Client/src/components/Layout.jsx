import { Header } from './Header'
import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'

export const Layout = ({ toggleAddContactForm, activeTab, handleTabChange }) => {
  return (
    <>
      <Header toggleAddContactForm={toggleAddContactForm} />
      <Outlet />
      <NavBar activeTab={activeTab} handleTabChange={handleTabChange} />
    </>
  )
}
