import { useState } from 'react'
import { ContactItem } from './ContactItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import useContacts from '../../hooks/useContacts'
import PropTypes from 'prop-types'

export const ContactList = ({ toggleAddContactForm }) => {
  const { contacts, searchResultsFound, searchTerm, setSearchTerm } = useContacts()
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
    <div className='m-w-full overflow-x-auto md:overflow-y-auto pt-1 px-2 md:p-0'>
      <div className="mb-4 m-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilter('all')}
        >
          All Contacts
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'favorites'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilter('favorites')}
        >
          Favorites
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'recent'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setFilter('recent')}
        >
          Recent Contacts
        </button>
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

ContactList.propTypes = {
  toggleAddContactForm: PropTypes.func.isRequired
}
