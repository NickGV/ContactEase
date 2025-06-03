import { useContext } from 'react'
import { ContactsContext } from '../context/ContactsContext'
import useChat from '../hooks/useChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComment, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export const DashboardPage = () => {
  const { contacts } = useContext(ContactsContext)
  const { chats } = useChat()

  const favoriteContacts = contacts.filter(contact => contact.isFavorite)
  const recentChats = chats.slice(0, 5)

  const stats = [
    { title: 'Contactos', value: contacts.length, icon: faUser, color: 'bg-blue-500' },
    { title: 'Chats Activos', value: chats.length, icon: faComment, color: 'bg-green-500' },
    { title: 'Favoritos', value: favoriteContacts.length, icon: faStar, color: 'bg-yellow-500' },
    { title: 'Notificaciones', value: chats.filter(chat => chat.hasNotification).length, icon: faCircleCheck, color: 'bg-purple-500' }
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className={`${stat.color} text-white p-3 rounded-full mr-4`}>
              <FontAwesomeIcon icon={stat.icon} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contactos Recientes</h2>
          <div className="space-y-4">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact._id} className="flex items-center p-3 border-b border-gray-100">
                <div className="bg-gray-200 text-gray-700 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phoneNumber}</p>
                </div>
              </div>
            ))}
            {contacts.length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay contactos disponibles</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Chats Recientes</h2>
          <div className="space-y-4">
            {recentChats.map((chat) => (
              <div key={chat._id} className="flex items-center p-3 border-b border-gray-100">
                <div className="bg-gray-200 text-gray-700 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faComment} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {chat.participants.map(p => p.username).join(', ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {chat.lastMessage ? new Date(chat.lastMessage.timestamp).toLocaleString() : 'No hay mensajes'}
                  </p>
                </div>
                {chat.hasNotification && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
                )}
              </div>
            ))}
            {chats.length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay chats disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
