import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactsContext } from '../context/ContactsContext'
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ChatContactItem } from './ChatContactItem'
import { useContext, useState } from 'react'
import { SearchBar } from './SearchBar'

export const ChatSidebar = () => {
  const { contacts, searchResultsFound, searchTerm, setSearchTerm, selectedContact } = useContext(ContactsContext)

  const filteredContacts = contacts.filter(contact => {
    if (searchTerm.trim() === '') {
      return true
    }
    return Object.values(contact).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className='m-w-full w-11/12  overflow-x-auto md:overflow-y-auto pt-1 px-2 '>
      <SearchBar />
      {!searchResultsFound
        ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-sm md:text-2xl mt-4">
            there is no contact with:
            <span className="font-bold"> {searchTerm}</span>
          </h1>
          <button
            className="underline text-link text-sm md:text-xl "
            onClick={() => setSearchTerm('')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Return
          </button>
        </div>
          )
        : filteredContacts && filteredContacts.length > 0
          ? (
        <div className="flex md:flex-col ">
          <h2 className="hidden md:block mb-3 text-xl text-white-headline font-bold p-2">
            Contact List
          </h2>
          <div className="md:hidden flex flex-col items-center justify-center">
            <button
              type="button"
              className="flex items-center text-center justify-center md:hidden mt-3 text-white-btn-text bg-gray-500 rounded-full h-16 w-16"
            >
              <FontAwesomeIcon icon={faUserPlus} className="text-3xl" />
            </button>
            <span className="text-sm text-center text-slate-700">
              Add contact
            </span>
          </div>
          <ul className={`m-w-full flex md:grid ${selectedContact ? 'md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {filteredContacts.map((contact) => (
              <li className="md:border-b" key={contact.id}>
                <ChatContactItem
                  id={contact.id}
                  name={contact.name}
                  email={contact.email}
                  phoneNumber={contact.phoneNumber}
                  isFavorite={contact.isFavorite}
                  notes={contact.notes}
                />
              </li>
            ))}
          </ul>
        </div>
            )
          : (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-center text-sm md:text-lg lg:text-xl mx-auto mt-10">
            There is nothing here yet, try to add a new contact
          </h1>
        </div>
            )}
    </div>
  )
}
