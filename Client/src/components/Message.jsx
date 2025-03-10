import { useEffect, useState } from 'react'
import { getUser } from '../services/authService'
import useAuth from '../hooks/useAuth'

export const Message = ({ message }) => {
  const [senderName, setSenderName] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const fetchSenderName = async () => {
      if (message.senderId === user._id) {

      } else {
        const user = await getUser(message.senderId)
        setSenderName(user.username)
      }
    }

    fetchSenderName()
  }, [message.senderId])

  return (
    <div className={`flex ${message.senderId === user._id ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg p-2 rounded-lg ${message.senderId === user._id ? 'bg-green-200' : 'bg-white'} shadow-md`}>
      <span className="text-xs text-gray-500">{senderName}</span>

        <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-700">{message.content}</p>

          <span className="text-[10px] ml-2 text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}
