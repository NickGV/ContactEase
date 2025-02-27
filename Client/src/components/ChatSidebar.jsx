import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactsContext } from '../context/ContactsContext'
import { faArrowLeft, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { SearchBar } from './SearchBar'

export const ChatSidebar = () => {
  const {
    contacts, searchResultsFound, searchTerm, setSearchTerm, selectedContact, handleSelectedContact,
    deleteContact
  } = useContext(ContactsContext)

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
  const handleclick = (e, contact) => {
    e.stopPropagation()
    handleSelectedContact(contact)
  }

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
                <div
                      className={`relative flex gap-3 md:justify-between p-4 md:bg-black-bg hover:cursor-pointer w-20 md:w-full rounded-lg ${
                        selectedContact?.id === contact.id ? 'md:bg-slate-700' : ''
                      }`}
                      onClick={(e) => handleclick(e, contact)}
                    >
                      <div className="flex flex-col md:flex-row md:gap-3 items-center w-full">
                        <div className="w-15 flex justify-center items-center text-3xl md:text-5xl text-white-btn-text bg-black-bg md:bg-transparent border rounded-full h-16 w-16 md:h-14 md:w-14 p-4">
                          <FontAwesomeIcon icon={faUser} className="w-6" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="font-bold text-white text-sm md:text-lg">
                            {name}
                          </p>
                          <p className="hidden md:block md:text-md lg:text-lg">{contact.phoneNumber}</p>
                          <a href={`mailto:${contact.email}`} className="hidden md:block text-sm xl:text-lg text-link underline">
                            {contact.email}
                          </a>
                        </div>
                      </div>
                      <button
                        className="hidden md:block absolute text-xl top-0 right-0 mr-2 text-gray-300 hover:text-red-500 hover:scale-110 transition-all"
                        onClick={() => deleteContact(id)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
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
