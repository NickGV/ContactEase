import { useState, useRef, useEffect } from 'react'
import { Message } from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import useChat from '../../hooks/useChat'
import { getUserById } from '../../services/authService'

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
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h2 className="text-lg font-medium">
          {contact?.username || 'Chat'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No hay mensajes aún</p>
            <p className="text-sm">Envía un mensaje para iniciar la conversación</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 text-primary hover:text-primary-dark transition-colors"
            disabled={!newMessage.trim()}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  )
}
