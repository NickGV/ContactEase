import { createContext, useEffect, useState } from 'react'
import { login, register, logout, deleteUser, getUser } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const handleRegister = async (username, email, phoneNumber, password) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '')
    const response = await register(username, email, Number(cleanedPhoneNumber), password)
    if (response.token) {
      localStorage.setItem('token', response.token)
      getUserData()
    }
    return response
  }

  const handleLogin = async (email, password) => {
    const response = await login(email, password)
    if (response.token) {
      localStorage.setItem('token', response.token)
      getUserData()
    }
    return response
  }

  const handleLogout = async () => {
    const response = await logout()
    localStorage.removeItem('token')
    setUser(null)
    return response
  }

  const handleDeleteUser = async () => {
    const response = await deleteUser()
    localStorage.removeItem('token')
    setUser(null)
    return response
  }

  const getUserData = async () => {
    const response = await getUser()
    setUser(response)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout, handleDeleteUser }}>
      {children}
    </AuthContext.Provider>
  )
}
