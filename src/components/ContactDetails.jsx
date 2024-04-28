import { useContext, useState } from 'react'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as solidStar,
  faUser,
  faPenToSquare,
  faUserMinus
} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { ContactsContext } from '../context/ContactsContext'

export const ContactDetails = () => {
  const [hoveredButton, setHoveredButton] = useState(null)

  const {
    contacts,
    addToFavorites,
    deleteContact,
    handleEditContact,
    handleSelectedContact
  } = useContext(ContactsContext)

  const contactSelected = contacts.find((contact) => contact.isSelected)

  return (
    <div className="w-auto h-full  mx-2 md:mr-4 md:mb-4 md:mt-4 p-3 shadow-md shadow-slate-400 rounded-md flex flex-col bg-black-bg border-2 border-orange-400 flex-1">
      {!contactSelected
        ? (
        <div className="text-center md:text-2xl mt-5">
          No contact selected, Try click one
        </div>
          )
        : (
        <>
          <div className="flex gap-3 items-center mb-4">
            <div className="w-25 text-5xl md:text-7xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
              <p className="font-bold text-xl md:text-2xl">
                {contactSelected.name}
              </p>
              <p className="md:text-xl">{contactSelected.phoneNumber}</p>
              <a href={'somthing'} className="text-link underline  md:text-xl">
                {contactSelected.email}
              </a>
            </div>
          </div>
          <h2 className=" text-white-headline font-bold md:text-2xl mb-3">
            Additional Notes
          </h2>
          <div className="overflow-y-auto max-h-3/4 mb-10 border-b rounded-sm p-4">
            <p className="overflow-y-auto ">{contactSelected.notes}</p>
          </div>
          <div>
            <div className="mt-auto flex justify-end space-x-2 gap-4">
              <button
                className="text-gray-500 text-2xl flex items-center relative hover:scale-150 transition-all"
                title="Editar (Editar contacto)"
                onClick={() => handleEditContact(contactSelected.id)}
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
                className={`text-2xl flex items-center relative hover:scale-150 transition-all ${
                  contactSelected.isFavorite
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                }`}
                title="Agregar a favoritos (Agregar a lista de favoritos)"
                onClick={() => addToFavorites(contactSelected.id)}
                onMouseEnter={() => setHoveredButton('favorites')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {contactSelected.isFavorite
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
                className="py-3 px-5  text-sm font-medium text-white-btn-text focus:outline-none bg-orange-btn rounded-lg border border-gray-200 hover:bg-orange-500   transition-all hover:scale-95 "
                onClick={() => deleteContact(contactSelected.id)}
              >
                <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
                Delete Contact
              </button>
            </div>
          </div>
        </>
          )}
    </div>
  )
}
