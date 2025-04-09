import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as solidStar,
  faUser,
  faPenToSquare,
  faUserMinus
} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import useContacts from '../hooks/useContacts'

export const ContactDetails = () => {
  const [hoveredButton, setHoveredButton] = useState(null)

  const {
    addToFavorites,
    handleEditContact,
    selectedContact,
    deleteContactById
  } = useContacts()

  return (
    <div className="w-full h-full mx-auto p-2 sm:p-3 md:p-4 lg:p-5 shadow-md shadow-slate-400 rounded-md flex flex-col bg-black-bg flex-1">
      {!selectedContact
        ? (
        <div className="text-center text-lg sm:text-xl md:text-2xl mt-5 flex items-center justify-center h-full">
          No contact selected, Try click one
        </div>
          )
        : (
        <>
          <div className="flex gap-2 sm:gap-3 items-center mb-3 sm:mb-4">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="flex-1">
              <div>
                <p className="font-bold text-lg sm:text-xl md:text-2xl truncate">
                  {selectedContact.name}
                </p>
                <p className="text-sm sm:text-base md:text-xl truncate">{selectedContact.phoneNumber}</p>
                <a href={`mailto:${selectedContact.email}`} className="text-link underline text-sm sm:text-base md:text-xl truncate block">
                  {selectedContact.email}
                </a>
              </div>
            </div>
          </div>
          <h2 className="text-white-headline font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
            Additional Notes
          </h2>
          <div className="overflow-y-auto flex-grow mb-4 sm:mb-6 md:mb-8 lg:mb-10 border-b rounded-sm p-2 sm:p-3 md:p-4">
            <p className="overflow-y-auto text-sm sm:text-base">{selectedContact.notes}</p>
          </div>
          <div className="mt-auto">
            <div className="flex justify-end items-center space-x-2 sm:space-x-3 md:space-x-4">
              <button
                className="text-gray-500 text-xl sm:text-2xl flex items-center relative hover:scale-125 sm:hover:scale-150 transition-all"
                title="Edit contact"
                onClick={() => handleEditContact(selectedContact)}
                onMouseEnter={() => setHoveredButton('edit')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                {hoveredButton === 'edit' && (
                  <span className="absolute bg-gray-800 text-white text-xs p-1 rounded-md top-0 left-1/2 transform -translate-x-1/2 -translate-y-full whitespace-nowrap">
                    Edit
                  </span>
                )}
              </button>
              <button
                className={`text-xl sm:text-2xl flex items-center relative hover:scale-125 sm:hover:scale-150 transition-all ${
                  selectedContact.isFavorite
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                }`}
                title="Add to favorites"
                onClick={() => addToFavorites(selectedContact._id)}
                onMouseEnter={() => setHoveredButton('favorites')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {selectedContact.isFavorite
                  ? (
                  <FontAwesomeIcon
                    icon={solidStar}
                    className="text-yellow-500"
                  />
                    )
                  : (
                  <FontAwesomeIcon
                    icon={regularStar}
                    className="text-yellow-500"
                  />
                    )}
                {hoveredButton === 'favorites' && (
                  <span className="absolute bg-gray-800 text-white text-xs p-1 rounded-md top-0 left-1/2 transform -translate-x-1/2 -translate-y-full whitespace-nowrap">
                    Add To Favorites
                  </span>
                )}
              </button>
              <button
                className="py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm font-medium text-white-btn-text focus:outline-none bg-orange-btn rounded-lg border border-gray-200 hover:bg-orange-500 transition-all hover:scale-95"
                onClick={() => deleteContactById(selectedContact.id)}
              >
                <FontAwesomeIcon icon={faUserMinus} className="mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Delete Contact</span>
                <span className="xs:hidden">Delete</span>
              </button>
            </div>
          </div>
        </>
          )}
    </div>
  )
}
