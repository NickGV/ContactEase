import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Header onMenuClick={() => setMobileMenuOpen(true)} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
      <main className="flex-1 md:ml-[280px] p-4 overflow-auto pt-20">
        <Outlet />
      </main>
    </div>
  )
}
