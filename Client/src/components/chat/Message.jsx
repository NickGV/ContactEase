import { useEffect, useState } from 'react'
import { getUser } from '../../services/authService'
import useAuth from '../../hooks/useAuth'

export const Message = ({ message }) => {
  const [senderName, setSenderName] = useState('')
  const { user } = useAuth()
  const isCurrentUser = message.senderId === user._id

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
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-sm ${
          isCurrentUser
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {!isCurrentUser && senderName && (
          <span className="block text-xs font-medium mb-1">{senderName}</span>
        )}

        <p className="text-sm">{message.content}</p>

        <div className="flex justify-end mt-1">
          <span className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}
