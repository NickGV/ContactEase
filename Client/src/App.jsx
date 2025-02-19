import { Header } from './components/Header'
import { Toaster } from 'sonner'
import { AddContactForm } from './components/AddContactForm'
import { useState } from 'react'
import { ContactsProvider } from './context/ContactsProvider'
import { ContactPage } from './pages/ContactsPage'
import { NavBar } from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'

function App () {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('contacts')

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
        <Header toggleAddContactForm={toggleAddContactForm} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path='/contacts' element={<ContactPage tab={activeTab}
          toggleAddContactForm={toggleAddContactForm}
          handleTabChange={handleTabChange} showForm={showForm}/>
          }/>
          <Route path='/chat'/>

        </Routes>
        <NavBar activeTab={activeTab} handleTabChange={handleTabChange} />

      </ContactsProvider>
    </>
  )
}

export default App
