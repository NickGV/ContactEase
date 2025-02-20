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

  const [hoveredButton, setHoveredButton] = useState(null)

  const handleFavoritesClick = (e) => {
    e.stopPropagation()
    addToFavorites(id)
  }

  const editingContact = (e) => {
    e.stopPropagation()
    console.log('editing contact')
    handleEditContact(id)
  }

  return (
    <>
      <div
        className={` relative flex gap-3 md:justify-between p-4 md:bg-black-bg hover:cursor-pointer w-20 md:w-full rounded-lg ${
          isSelected ? 'md:bg-slate-700' : ''
        }`}
        onClick={() => handleSelectedContact(id)}
      >
        <div className="flex flex-col md:flex-row md:gap-3 items-center w-full">
          <div className="w-15 flex justify-center items-center text-3xl md:text-5xl text-white-btn-text bg-black-bg md:bg-transparent border rounded-full h-16 w-16 md:h-14 md:w-14 p-4">
            <FontAwesomeIcon icon={faUser} className="w-6" />
          </div>
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-700 text-sm md:text-lg">
              {name}
            </p>
            <p className="hidden md:block md:text-md lg:text-lg">{phoneNumber}</p>
            <a href={`mailto:${email}`} className="hidden md:block text-sm xl:text-lg text-link underline">
              {email}
            </a>
          </div>
        </div>
        <div className="sm:hidden xl:flex flex items-end gap-3 relative">
          <button
            className={`hidden text-2xl md:flex items-center relative hover:scale-150 transition-all ${
              isFavorite ? 'text-yellow-500' : 'text-gray-500'
            }`}
            title="Agregar a favoritos (Agregar a lista de favoritos)"
            onClick={handleFavoritesClick}
            onMouseEnter={() => setHoveredButton('favorite')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {isFavorite
              ? (
              <FontAwesomeIcon icon={solidStar} className="text-yellow-500" />
                )
              : (
              <FontAwesomeIcon icon={regularStar} className="text-yellow-500" />
                )}
            {hoveredButton === 'favorite' && (
              <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-1 py-0.5 rounded">
                Add to favorites
              </span>
            )}
          </button>
          <button
            className="hidden text-gray-500 text-2xl md:flex items-center relative hover:scale-150 transition-all"
            title="Editar (Editar contacto)"
            onClick={editingContact}
            onMouseEnter={() => setHoveredButton('edit')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            {hoveredButton === 'edit' && (
              <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-1 py-0.5 rounded">
                Edit
              </span>
            )}
          </button>
        </div>
        <button
          className="hidden md:block absolute text-xl top-0 right-0 mr-2 text-gray-300 hover:text-red-500 hover:scale-110 transition-all"
          onClick={() => deleteContact(id)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </>
  )
}
