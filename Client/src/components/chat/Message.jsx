import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { getUser } from '../../services/authService'
import useAuth from '../../hooks/useAuth'
import PropTypes from 'prop-types'

export const Message = ({ message }) => {
  const [senderName, setSenderName] = useState('')
  const { user } = useAuth()
  const isCurrentUser = message.senderId === user._id
  const isOwn = message.senderId === user._id

  useEffect(() => {
    const fetchSenderName = async () => {
      if (!isCurrentUser) {
        const user = await getUser(message.senderId)
        setSenderName(user.username)
      }
    }

    fetchSenderName()
  }, [message.senderId, isCurrentUser])

  return (
    <div className={`flex items-end mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
        </div>
      )}
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm text-sm ${
          isOwn
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
        }`}
      >
        {message.content}
        <div className="text-[10px] text-gray-400 text-right mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {isOwn && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
        </div>
      )}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired
}
