import { useState, useRef, useEffect } from 'react'
import { Message } from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useChat from '../hooks/useChat'

export const ChatWindow = () => {
  const [newMessage, setNewMessage] = useState('')
  const { addMessage, messages } = useChat()
  const messagesEndRef = useRef(null)

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

  return (
    <div className="bg-black-bg flex flex-col w-full h-full shadow-lg rounded-lg p-4">
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
          className="flex-1 rounded-lg px-4 py-2 mr-2 bg-gray-700 outline-none text-white hover:bg-gray-600 transition-colors duration-300"
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
