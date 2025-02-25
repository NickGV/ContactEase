import { createContext, useEffect, useState } from 'react'
import { login, register, logout, deleteUser } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const handleRegister = async (username, email, password) => {
    const response = await register(username, email, password)
    return response
  }

  const handleLogin = async (email, password) => {
    const response = await login(email, password)
    return response
  }

  const handleLogout = async () => {
    const response = await logout()
    return response
  }

  const handleDeleteUser = async () => {
    const response = await deleteUser()
    return response
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Fetch user data with token
    }
  }, [])

  return (
    <AuthContext.Provider value={{ handleRegister, handleLogin, handleLogout, handleDeleteUser }}>
      {children}
    </AuthContext.Provider>
  )
}
