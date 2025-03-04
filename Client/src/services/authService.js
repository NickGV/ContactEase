import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password })
    console.log(response)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, getAuthHeaders())
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, getAuthHeaders())
    return response.data
  } catch (error) {
    return error.response.data
  }
}
