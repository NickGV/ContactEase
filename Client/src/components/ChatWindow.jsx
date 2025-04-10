import { useState, useRef, useEffect } from 'react'
import { Message } from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import useChat from '../hooks/useChat'
import { getUserById } from '../services/authService'

export const ChatWindow = () => {
  const [newMessage, setNewMessage] = useState('')
  const { addMessage, messages, setSelectedChat, selectedChat } = useChat()
  const messagesEndRef = useRef(null)
  const [contact, setContact] = useState(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return
    try {
      await addMessage(newMessage)
      setNewMessage('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleCloseChat = () => {
    setSelectedChat(null)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseChat()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const getContactName = async () => {
    if (selectedChat) {
      const response = await getUserById(selectedChat?.participants[1])
      if (response) {
        setContact(response)
      }
    }
  }
  useEffect(() => {
    getContactName()
  }, [selectedChat])

  return (
    <div className="bg-black-bg flex flex-col w-full h-full shadow-lg rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleCloseChat}
            className="mr-3 text-white-btn-text bg-orange-btn hover:bg-orange-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          </button>
          <h2 className="text-lg font-bold truncate flex-1">
            {contact?.username || 'Chat'}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 w-4/5 rounded-lg px-4 py-2 mr-2 bg-gray-700 outline-none text-white hover:bg-gray-600 transition-colors duration-300"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-gray-700 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}
