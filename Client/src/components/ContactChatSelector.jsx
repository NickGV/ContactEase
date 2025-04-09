import { useState } from 'react'

export const ContactChatSelector = ({ contacts, onSelectContact, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black-bg p-3 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Select a Contact</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-3 sm:mb-4 rounded-lg bg-gray-700 text-white outline-none text-sm sm:text-base"
          placeholder="Search contacts..."
        />
        <div className="max-h-48 sm:max-h-56 md:max-h-64 overflow-y-auto">
          <ul className="flex flex-col gap-1 sm:gap-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <li 
                  key={contact._id} 
                  className="cursor-pointer hover:bg-gray-700 p-1.5 sm:p-2 rounded text-sm sm:text-base transition-colors duration-200 flex items-center"
                  onClick={() => onSelectContact(contact)}
                >
                  <span className="truncate">{contact.name}</span>
                </li>
              ))
            ) : (
              <li className="text-center text-sm sm:text-base text-gray-400 py-2">No contacts found</li>
            )}
          </ul>
        </div>
        <button
          className="mt-3 sm:mt-4 w-full p-1.5 sm:p-2 bg-red-500 text-white font-medium text-sm sm:text-base rounded-lg transition-colors duration-300 hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
