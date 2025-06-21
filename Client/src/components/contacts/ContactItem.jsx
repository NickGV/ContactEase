import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrash,
  faUser,
  faStar as solidStar
} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import useContacts from '../../hooks/useContacts'
import PropTypes from 'prop-types'

export const ContactItem = ({
  _id,
  name,
  email,
  phoneNumber,
  notes,
  isFavorite
}) => {
  const {
    handleSelectedContact,
    addToFavorites,
    deleteContactById,
    handleEditContact,
    selectedContact
  } = useContacts()

  const [hoveredButton, setHoveredButton] = useState(null)

  const handleDeleteContact = (e) => {
    e.stopPropagation()
    deleteContactById(_id)
  }

  const handleFavoritesClick = (e) => {
    e.stopPropagation()
    addToFavorites(_id)
  }

  const editingContact = (e) => {
    e.stopPropagation()
    const contact = {
      _id,
      name,
      email,
      phoneNumber,
      notes,
      isFavorite
    }
    handleEditContact(contact)
  }

  const handleClick = (e) => {
    e.stopPropagation()
    const contact = {
      _id,
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
      className={`relative flex gap-3 md:justify-between p-4 hover:cursor-pointer w-full rounded-lg shadow-md hover:shadow-lg hover:shadow-black hover:border-none transition-all ${
        selectedContact?._id === _id ? 'md:bg-slate-700' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-row gap-3 items-center w-full">
        <div className="flex justify-center items-center text-3xl md:text-5xl text-white-btn-text bg-black-bg  border rounded-full h-16 w-16 md:h-16 md:w-16 p-4">
          <FontAwesomeIcon icon={faUser} className="w-6" />
        </div>
        <div className="text-center md:text-left">
          <p className="font-medium text-text-primary text-sm md:text-lg">
            {name}
          </p>
          <p className="text-text-secondary md:block md:text-md lg:text-lg">{phoneNumber}</p>
        </div>
      </div>
      <div className="sm:hidden xl:flex flex items-end gap-3 relative">
        <button
          className={`hidden text-2xl sm:flex md:flex items-center relative hover:scale-150  transition-all ${
            isFavorite ? 'text-yellow-500' : 'text-gray-500'
          }`}
          title="Add to favorites (Add to favorites list)"
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
            <span className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2  text-black text-[8px] w-24 h-8 rounded font-bold">
              Add to favorites
            </span>
          )}
        </button>
        <button
          className="hidden text-2xl md:flex items-center relative hover:scale-150 text-primary transition-all"
          title="Edit (Edit contact)"
          onClick={editingContact}
          onMouseEnter={() => setHoveredButton('edit')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          {hoveredButton === 'edit' && (
            <span className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 text-black text-[8px] w-8 h-8 rounded font-bold">
              Edit
            </span>
          )}
        </button>
        <button
          className="text-2xl md:flex items-center relative hover:scale-150 transition-all text-red-500"
          title="Delete (Delete contact)"
          onMouseEnter={() => setHoveredButton('delete')}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={handleDeleteContact}
        >
          <FontAwesomeIcon icon={faTrash} />
          {hoveredButton === 'delete' && (
            <span className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 text-black text-[8px] w-8 h-8 rounded font-bold">
              Delete
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  phoneNumber: PropTypes.number.isRequired,
  notes: PropTypes.string,
  isFavorite: PropTypes.bool
}
