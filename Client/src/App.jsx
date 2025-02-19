import { Header } from './components/Header'
import { Toaster } from 'sonner'
import { AddContactForm } from './components/AddContactForm'
import { useState } from 'react'
import { ContactsProvider } from './context/ContactsProvider'
import { ContactPage } from './pages/ContactsPage'
import { NavBar } from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { RegisterPage } from './pages/RegisterPage'

function App () {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('contacts')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const toggleAddContactForm = () => {
    setShowForm(!showForm)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <ContactsProvider>
        <Toaster richColors closeButton />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {isAuthenticated
            ? (
            <Route element={<Layout toggleAddContactForm={toggleAddContactForm} activeTab={activeTab} handleTabChange={handleTabChange} />}>
              <Route path="/" element={<ContactPage tab={activeTab}
                toggleAddContactForm={toggleAddContactForm}
                handleTabChange={handleTabChange} showForm={showForm}/>} />
              <Route path='/contacts' element={<ContactPage tab={activeTab}
                toggleAddContactForm={toggleAddContactForm}
                handleTabChange={handleTabChange} showForm={showForm}/>} />
              <Route path='/chat' element={<div>Chat Page</div>} />
            </Route>
              )
            : (
            <Route path="*" element={<LoginPage />} />
              )}
        </Routes>
      </ContactsProvider>
    </>
  )
}

export default App
