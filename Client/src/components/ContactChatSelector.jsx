import { useState } from 'react'

export const ContactChatSelector = ({ contacts, onSelectContact, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black-bg p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Select a Contact</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white outline-none"
          placeholder="Search contacts..."
        />
        <ul className="flex flex-col gap-2">
          {filteredContacts.map((contact) => (
            <li key={contact._id} className="cursor-pointer hover:bg-gray-200 hover:text-black p-2 rounded" onClick={() => onSelectContact(contact)}>
              {contact.name}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 w-full p-2 bg-red-500 text-white font-bold rounded-lg transition-colors duration-300 hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
