import { Header } from './Header'
import { NavBar } from './NavBar'

export const Layout = ({ children, toggleAddContactForm, activeTab, handleTabChange }) => {
  return (
    <>
      <Header toggleAddContactForm={toggleAddContactForm} />
      {children}
      <NavBar activeTab={activeTab} handleTabChange={handleTabChange} />
    </>
  )
}
