import { useState } from 'react'
import useChat from '../hooks/useChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faComments } from '@fortawesome/free-solid-svg-icons'
import { AddContactForm } from '../components/contacts/AddContactForm'
import { ContactChatSelector } from '../components/chat/ContactChatSelector'
import useContacts from '../hooks/useContacts'

export const DashboardPage = () => {
  const { contacts, handleSelectedContact } = useContacts()
  const { chats } = useChat()
  const [showAddContact, setShowAddContact] = useState(false)
  const [showChatSelector, setShowChatSelector] = useState(false)

  const recentContacts = [...contacts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)
  const recentChats = chats
    .filter(chat => chat.lastMessage)
    .sort((a, b) => new Date(b.lastMessage?.timestamp) - new Date(a.lastMessage?.timestamp))
    .slice(0, 4)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium text-base"
            onClick={() => setShowAddContact(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> New Contact
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition font-medium text-base border border-gray-200"
            onClick={() => setShowChatSelector(true)}
          >
            <FontAwesomeIcon icon={faComments} /> New Chat
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Contacts</h2>
        <div className="flex flex-wrap gap-6">
          {recentContacts.length === 0 && (
            <p className="text-gray-500">No recent contacts</p>
          )}
          {recentContacts.map(contact => (
            <div key={contact._id} className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center px-7 py-6 min-w-[180px] max-w-[220px] hover:cursor-pointer hover:scale-105 transition-transform" onClick={() => handleSelectedContact(contact)}>
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-4xl text-blue-500">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 text-base">{contact.name}</div>
                <div className="text-gray-500 text-sm">{contact.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent chats</h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {recentChats.length === 0 && (
            <p className="text-gray-500 p-6">No recent chats</p>
          )}
          <ul>
            {recentChats.map(chat => {
              const lastMsg = chat.lastMessage
              const participant = chat.participants.find(p => p.username !== undefined)
              return (
                <li key={chat._id} className="flex items-center px-6 py-4 border-b last:border-b-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-blue-500 mr-4">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{participant?.username || 'Unknown'}</div>
                    <div className="text-gray-500 text-sm truncate">{lastMsg?.content || ''}</div>
                  </div>
                  <div className="text-xs text-gray-400 ml-4 whitespace-nowrap">
                    {lastMsg?.timestamp ? new Date(lastMsg.timestamp).toLocaleDateString() : ''}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <AddContactForm showForm={showAddContact} onClose={() => setShowAddContact(false)} />
      {showChatSelector && (
        <ContactChatSelector
          contacts={contacts}
          onSelectContact={() => setShowChatSelector(false)}
          onClose={() => setShowChatSelector(false)}
        />
      )}
    </div>
  )
}
