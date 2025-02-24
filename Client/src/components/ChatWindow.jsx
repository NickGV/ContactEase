// src/components/ChatWindow.js
import { useEffect, useState } from 'react'
import { Message } from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  // useEffect(() => {
  //   socket.emit('joinChat', chatId)

  //   socket.on('message', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message])
  //   })

  //   return () => {
  //     socket.off('message')
  //   }
  // }, [chatId])

  const handleSendMessage = () => {
    // const message = { chatId, content: newMessage }
    // socket.emit('sendMessage', message)
    // setMessages((prevMessages) => [...prevMessages, message])
    // setNewMessage('')
  }

  return (
    <div className="bg-black-bg flex flex-col w-full h-full shadow-lg rounded-lg p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
