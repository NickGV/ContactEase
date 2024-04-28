import { useContext } from 'react'
import { ContactItem } from './ContactItem'
import { ContactsContext } from '../context/ContactsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export const Favorites = ({ handleTabChange, toggleAddContactForm }) => {
  const { contacts } = useContext(ContactsContext)
  const favoritesContacts = contacts.filter((contact) => contact.isFavorite)

  return (
    <div className="md:shadow-md md:shadow-slate-400 md:ml-4 md:mb-4 md:mt-4 rounded-md md:bg-black-bg md:border-2 md:border-orange-400 overflow-x-auto md:overflow-y-auto pt-1 px-2 md:p-0 flex-1 ">
      {favoritesContacts && favoritesContacts.length > 0
        ? (
        <div className="flex md:flex-col">
          <h2 className="hidden md:block mb-3 text-xl text-white-headline font-bold p-2">
            Favorites
          </h2>
          <div className="flex flex-col items-center">
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

          <ul className="w-full flex  md:flex-col">
            {favoritesContacts.map((contact) => (
              <li className="md:border-b" key={contact.id}>
                <ContactItem
                  id={contact.id}
                  name={contact.name}
                  email={contact.email}
                  phoneNumber={contact.phoneNumber}
                  isFavorite={contact.isFavorite}
                  isSelected={contact.isSelected}
                />
              </li>
            ))}
          </ul>
        </div>
          )
        : (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-center text-xl mx-auto mt-10">
            You have no one favorite contact, try to make one your favorite
          </h1>
          <button
            className="underline text-link hover:scale-110 "
            onClick={() => handleTabChange('contacts')}
          >
            Go back to contact list
          </button>
        </div>
          )}
    </div>
  )
}
