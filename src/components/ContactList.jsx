import { useContext } from 'react'
import { ContactItem } from './ContactItem'
import { ContactsContext } from '../context/ContactsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export const ContactList = ({ toggleAddContactForm }) => {
  const { contacts, searchResultsFound, searchTerm, setSearchTerm } =
    useContext(ContactsContext)

  return (
    <div className="md:shadow-md md:shadow-slate-400 md:ml-4 md:mb-4 md:mt-4 rounded-md md:bg-black-bg md:border-2 md:border-orange-400 overflow-x-auto md:overflow-y-auto pt-1 px-2 md:p-0 flex-1 ">
      {!searchResultsFound
        ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-2xl mt-4">
            there is no contact with:
            <span className="font-bold"> {searchTerm}</span>
          </h1>
          <button
            className="underline text-link text-xl "
            onClick={() => setSearchTerm('')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Return
          </button>
        </div>
          )
        : contacts && contacts.length > 0
          ? (
        <div className="flex md:flex-col ">
          <h2 className="hidden md:block mb-3 text-xl text-white-headline font-bold p-2">
            Contact List
          </h2>
          <div className="flex flex-col items-center justify-center">
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
          <ul className="w-full flex md:flex-col">
            {contacts.map((contact) => (
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
