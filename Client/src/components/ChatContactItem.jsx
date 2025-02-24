import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faUser,
  faXmark,
  faStar as solidStar
} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { ContactsContext } from '../context/ContactsContext'

export const ChatContactItem = ({
  id,
  name,
  email,
  phoneNumber,
  notes,
  isFavorite
}) => {
  const {
    handleSelectedContact,
    deleteContact,
    selectedContact
  } = useContext(ContactsContext)

  const handleclick = (e) => {
    e.stopPropagation()
    const contact = {
      id,
      name,
      email,
      phoneNumber,
      notes,
      isFavorite
    }
    handleSelectedContact(contact)
  }

  return (
    <div
      className={`relative flex gap-3 md:justify-between p-4 md:bg-black-bg hover:cursor-pointer w-20 md:w-full rounded-lg ${
        selectedContact?.id === id ? 'md:bg-slate-700' : ''
      }`}
      onClick={handleclick}
    >
      <div className="flex flex-col md:flex-row md:gap-3 items-center w-full">
        <div className="w-15 flex justify-center items-center text-3xl md:text-5xl text-white-btn-text bg-black-bg md:bg-transparent border rounded-full h-16 w-16 md:h-14 md:w-14 p-4">
          <FontAwesomeIcon icon={faUser} className="w-6" />
        </div>
        <div className="text-center md:text-left">
          <p className="font-bold text-white text-sm md:text-lg">
            {name}
          </p>
          <p className="hidden md:block md:text-md lg:text-lg">{phoneNumber}</p>
          <a href={`mailto:${email}`} className="hidden md:block text-sm xl:text-lg text-link underline">
            {email}
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
  )
}
