import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faUser,
  faXmark
  , faStar as solidStar
} from '@fortawesome/free-solid-svg-icons'

import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { ContactsContext } from '../context/ContactsContext'

export const ContactItem = ({
  id,
  name,
  email,
  phoneNumber,
  isSelected,
  isFavorite
}) => {
  const {
    handleSelectedContact,
    addToFavorites,
    deleteContact,
    handleEditContact
  } = useContext(ContactsContext)

  const handleFavoritesClick = (e) => {
    e.stopPropagation()
    addToFavorites(id)
  }

  const editingContact = (e) => {
    e.stopPropagation()
    handleEditContact(id)
  }
  return (
    <>
      <div
        className={`relative flex gap-3 md:justify-between p-3 md:hover:bg-slate-900 hover:cursor-pointer w-20 md:w-full ${
          isSelected ? 'md:bg-slate-900' : ''
        }`}
        onClick={() => handleSelectedContact(id)}
      >
        <div className="flex flex-col md:flex-row md:gap-3 items-center w-full">
          <div className="w-15 flex justify-center items-center text-3xl md:text-5xl text-white-btn-text bg-black-bg md:bg-transparent rounded-full h-16 w-16 md:h-10 md:w-10 p-4">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-700  text-sm md:text-lg">
              {name}
            </p>
            <p className="hidden md:block md:text-lg">{phoneNumber}</p>
            <a href={email} className="hidden md:block text-link underline">
              {email}
            </a>
          </div>
        </div>
        <div className="flex items-end gap-3 relative">
          <button
            className={`hidden text-2xl md:flex items-center relative hover:scale-150 transition-all ${
              isFavorite ? 'text-yellow-500' : 'text-gray-500'
            }`}
            title="Agregar a favoritos (Agregar a lista de favoritos)"
            onClick={handleFavoritesClick}
          >
            {isFavorite
              ? (
              <FontAwesomeIcon icon={solidStar} className="text-yellow-500" />
                )
              : (
              <FontAwesomeIcon icon={regularStar} className="text-yellow-500" />
                )}
          </button>
          <button
            className="hidden text-gray-500 text-2xl md:flex items-center relative hover:scale-150 transition-all"
            title="Editar (Editar contacto)"
            onClick={editingContact}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <button
          className="hidden md:block absolute text-xl top-0 right-0 mr-2 text-gray-600 hover:text-gray-800"
          onClick={() => deleteContact(id)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </>
  )
}
