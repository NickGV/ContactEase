import { createContext, useEffect, useState } from 'react'
import { getMessages, getOrCreateChat, sendMessage, getChats, deleteChat } from '../services/chatService'
import { io } from 'socket.io-client'

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [socket, setSocket] = useState(null)
  const [chats, setChats] = useState([])

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      query: { token: localStorage.getItem('token') }
    })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (socket) {
      const handleMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message])
      }
      socket.on('sendMessage', handleMessage)
      return () => socket.off('sendMessage', handleMessage)
    }
  }, [socket])

  useEffect(() => {
    const fetchChats = async () => {
      const response = await getChats()
      setChats(response)
    }
    fetchChats()
  }, [selectedChat])

  const getChatMessages = async (chatId) => {
    try {
      const response = await getMessages(chatId)
      setMessages(response)
    } catch (error) {
      return error
    }
  }

  const addMessage = async (message) => {
    if (selectedChat) {
      socket.emit('sendMessage', { chatId: selectedChat._id, content: message })
    }
  }

  const createOrGetChat = async (phoneNumber) => {
    try {
      const response = await getOrCreateChat(phoneNumber)
      if (response.chat) {
        if (response.chat._id === selectedChat?._id) {
          setSelectedChat(null)
          return
        }
        setSelectedChat(response.chat)
        getChatMessages(response.chat._id)
        socket.emit('joinChat', { chatId: response.chat._id })
      }
      return response
    } catch (error) {
      return error
    }
  }

  const deleteChatById = async (chatId) => {
    try {
      const response = await deleteChat(chatId)
      if (response.message && response.message === 'Chat deleted') {
        setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId))
      }
      setSelectedChat(null)
      setMessages([])
      return response
    } catch (error) {
      return error
    }
  }

  return (
    <ChatContext.Provider value={{
      getChatMessages,
      addMessage,
      createOrGetChat,
      deleteChatById,
      messages,
      selectedChat,
      setSelectedChat,
      chats
    }}>
      {children}
    </ChatContext.Provider>
  )
}
