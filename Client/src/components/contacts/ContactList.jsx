import { useState } from 'react'
import { ContactItem } from './ContactItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import useContacts from '../../hooks/useContacts'

export const ContactList = ({ toggleAddContactForm }) => {
  const { contacts, searchResultsFound, searchTerm, setSearchTerm } = useContacts()
  const [filter, setFilter] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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
    <div className='m-w-full overflow-x-auto md:overflow-y-auto pt-1 px-2 md:p-0'>
                  <div className="relative mb-4 m-4">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filters
          <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {isFilterOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-gray-300 rounded-md shadow-lg z-10 text-black">
            <div className="py-1">
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filter === 'all' ? 'bg-gray-100 font-medium' : ''}`}
                onClick={() => {
                  setFilter('all')
                  setIsFilterOpen(false)
                }}
              >
                All
              </button>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filter === 'favorites' ? 'bg-gray-100 font-medium' : ''}`}
                onClick={() => {
                  setFilter('favorites')
                  setIsFilterOpen(false)
                }}
              >
                Favorites
              </button>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filter === 'recent' ? 'bg-gray-100 font-medium' : ''}`}
                onClick={() => {
                  setFilter('recent')
                  setIsFilterOpen(false)
                }}
              >
                Recently Added
              </button>
            </div>
          </div>
        )}
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
        <div className="flex md:flex-col align-items-center w-full">
          <h2 className="hidden md:block mb-3 ml-4 text-xl text-white-headline font-bold p-2">
            Contact List
          </h2>
          <ul className={'m-w-full w-full flex flex-col'}>
            {filteredContacts.map((contact) => (
              <li className="md:border-b border-gray-200 w-full" key={contact._id}>
                <ContactItem
                  _id={contact._id}
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
            className="py-3 px-5 text-sm font-medium text-white-btn-text focus:outline-none bg-orange-btn rounded-lg border border-gray-200 hover:bg-primary-light hover:text-white focus:ring-4 focus:ring-gray-100 transition-all hover:scale-95"
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
