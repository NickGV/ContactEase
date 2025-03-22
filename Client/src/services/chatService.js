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

export const getOrCreateChat = async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_URL}`, { phoneNumber }, getChatHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while fetching chat'
  }
}

export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/${chatId}/messages`, getChatHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while fetching messages'
  }
}

export const sendMessage = async (chatId, content) => {
  try {
    const response = await axios.post(`${API_URL}/send`, { chatId, content }, getChatHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while sending message'
  }
}

export const deleteChat = async (chatId) => {
  try {
    const response = await axios.delete(`${API_URL}/${chatId}`, getChatHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while deleting chat'
  }
}

export const getChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/chats`, getChatHeaders())
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while fetching chats'
  }
}
