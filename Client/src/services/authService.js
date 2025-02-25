import axios from 'axios'

const API_URL = `${process.env.API_URL}/auth/`

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password })
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
  const response = await axios.get(`${API_URL}/logout`)
  return response.data
}

export const deleteUser = async () => {
  const response = await axios.delete(`${API_URL}/delete`)
  return response.data
}

export const getUser = async () => {
  const response = await axios.get(`${API_URL}/user`)
  return response.data
}
