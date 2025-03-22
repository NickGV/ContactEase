import { createContext, useEffect, useState } from 'react'
import { login, register, logout, deleteUser, getUser } from '../services/authService'
import { toast } from 'sonner'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const handleRegister = async (username, email, phoneNumber, password) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '')
    try {
      const response = await register(username, email, Number(cleanedPhoneNumber), password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        getUserData()
      }
      return response
    } catch (error) {
      toast.error(error)
      throw error
    }
  }

  const handleLogout = async () => {
    const response = await logout()
    localStorage.removeItem('token')
    setUser(null)
    return response
  }

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        getUserData()
      }
      return response
    } catch (error) {
      toast.error(error)
      throw error
    }
  }

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser()
      localStorage.removeItem('token')
      setUser(null)
      return response
    } catch (error) {
      toast.error(error)
      throw error
    }
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
