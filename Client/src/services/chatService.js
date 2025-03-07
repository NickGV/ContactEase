import axios from 'axios'

const API_URL = 'http://localhost:3000/api/chat'

const getChatHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const getOrCreateChat = async (contactId) => {
  try {
    const response = await axios.post(`${API_URL}`, { contactId }, getChatHeaders())
    return response.data
  } catch (error) {
    return error
  }
}

export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/${chatId}/messages`, getChatHeaders())
    return response.data
  } catch (error) {
    return error
  }
}

export const sendMessage = async (chatId, content) => {
  try {
    const response = await axios.post(`${API_URL}/send`, { chatId, content }, getChatHeaders())
    return response.data
  } catch (error) {
    return error
  }
}
