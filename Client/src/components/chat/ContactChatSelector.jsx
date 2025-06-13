import { useState } from 'react'

export const ContactChatSelector = ({ contacts, onSelectContact, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-sidebar-bg p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white-headline text-white">Select a Contact</h2>
          <button
            className="text-gray-400 hover:text-danger transition-colors text-xl"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-content-bg text-white outline-none text-base placeholder:text-text-secondary border border-gray-700 focus:border-primary transition"
          placeholder="Search contacts..."
        />
        <div className="max-h-56 overflow-y-auto scrollbar-thin">
          <ul className="flex flex-col gap-1">
            {filteredContacts.length > 0
              ? (
                  filteredContacts.map((contact) => (
                <li
                  key={contact._id}
                  className="cursor-pointer hover:bg-primary-light/20 p-2 rounded-lg text-base transition-colors duration-150 flex items-center gap-2 group"
                  onClick={() => onSelectContact(contact)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg uppercase">
                    {contact.name[0]}
                  </div>
                  <span className="truncate text-white">{contact.name}</span>
                </li>
                  ))
                )
              : (
              <li className="text-center text-base text-text-secondary py-3">No contacts found</li>
                )}
          </ul>
        </div>
        <button
          className="mt-5 w-full py-2 bg-danger text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
