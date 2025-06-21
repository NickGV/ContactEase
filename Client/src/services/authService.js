import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const register = async (username, email, phoneNumber, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, phoneNumber, password })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while registering'
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while logging in'
  }
}

export const update = async (username, email, phoneNumber, currentPassword, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/edit`, { username, email, phoneNumber, currentPassword, newPassword }, getAuthHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while editing the user'
  }
}

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while logging out'
  }
}

export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, getAuthHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while deleting user'
  }
}

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, getAuthHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while featching user'
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, getAuthHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while featching user'
  }
}
