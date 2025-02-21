import { useContext, useState } from 'react'
import { ContactItem } from './ContactItem'
import { ContactsContext } from '../context/ContactsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export const ContactList = ({ toggleAddContactForm }) => {
  const { contacts, searchResultsFound, searchTerm, setSearchTerm, selectedContact } = useContext(ContactsContext)
  const [filter, setFilter] = useState('all')

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'favorites') {
      return contact.isFavorite
    } else if (filter === 'recent') {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return new Date(contact.date) >= oneWeekAgo
    }
    return true
  })

  return (
    <div className='m-w-full w-11/12 md:m-4 overflow-x-auto md:overflow-y-auto pt-1 px-2 md:p-0'>
      <div className="flex justify-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          All
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="filter"
            value="favorites"
            checked={filter === 'favorites'}
            onChange={() => setFilter('favorites')}
          />
          Favorites
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="filter"
            value="recent"
            checked={filter === 'recent'}
            onChange={() => setFilter('recent')}
          />
          Recently Added
        </label>
      </div>
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
              onClick={toggleAddContactForm}
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
                <ContactItem
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
          <button
            type="button"
            className="py-3 px-5 text-sm font-medium text-white-btn-text focus:outline-none bg-orange-btn rounded-lg border border-gray-200 hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 transition-all hover:scale-95"
            onClick={toggleAddContactForm}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Add New Contact
          </button>
        </div>
            )}
    </div>
  )
}
