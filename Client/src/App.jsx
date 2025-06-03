import { Toaster } from 'sonner'
import { useState } from 'react'
import { ContactPage } from './pages/ContactsPage'
import { ChatPage } from './pages/ChatPage'
import { DashboardPage } from './pages/DashboardPage'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { RegisterPage } from './pages/RegisterPage'
import { ContactsProvider } from './context/ContactsContext'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import useAuth from './hooks/useAuth'

function AppContent () {
  const [showForm, setShowForm] = useState(false)
  const { user } = useAuth()

  const toggleAddContactForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      <ContactsProvider>
        <ChatProvider>
          <Toaster richColors closeButton />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {user
              ? (
              <Route element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                  path="/contacts"
                  element={
                    <ContactPage
                      toggleAddContactForm={toggleAddContactForm}
                      showForm={showForm}
                    />
                  }
                />
                <Route path="/chat" element={<ChatPage />} />
              </Route>
                )
              : (
              <Route path="*" element={<LoginPage />} />
                )}
          </Routes>
        </ChatProvider>
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
