import { Toaster } from 'sonner'
import { useState, useContext } from 'react'
import { ContactsProvider } from './context/ContactsProvider'
import { ContactPage } from './pages/ContactsPage'
import { ChatPage } from './pages/ChatPage'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { RegisterPage } from './pages/RegisterPage'
import { AuthProvider, AuthContext } from './context/AuthContext'

function AppContent () {
  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(AuthContext)

  const toggleAddContactForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      <ContactsProvider>
        <Toaster richColors closeButton />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {user
            ? (
            <Route element={<Layout />}>
              <Route path="/" element={<ContactPage toggleAddContactForm={toggleAddContactForm} showForm={showForm} />} />
              <Route path="/contacts" element={<ContactPage toggleAddContactForm={toggleAddContactForm} showForm={showForm} />} />
              <Route path="/chat" element={<ChatPage />} />
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

function App () {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
