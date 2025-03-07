import { createContext, useState } from 'react'
import { getMessages, getOrCreateChat, sendMessage } from '../services/chatService'

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)

  const getChatMessages = async (chatId) => {
    try {
      const response = await getMessages(chatId)
      setMessages(response)
    } catch (error) {
      console.error(error)
    }
  }

  const addMessage = async (message) => {
    try {
      await sendMessage(selectedChat._id, message)
      getChatMessages(selectedChat._id)
    } catch (error) {
      console.error(error)
    }
  }

  const createOrGetChat = async (contactId) => {
    try {
      const response = await getOrCreateChat(contactId)
      if (response.chat._id === selectedChat?._id) {
        setSelectedChat(null)
        return
      }

      setSelectedChat(response.chat)
      getChatMessages(response.chat._id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ChatContext.Provider value={{
      getChatMessages,
      addMessage,
      createOrGetChat,
      messages,
      selectedChat,
      setSelectedChat
    }}>
      {children}
    </ChatContext.Provider>
  )
}
