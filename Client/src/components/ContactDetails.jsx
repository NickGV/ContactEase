import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as solidStar,
  faUser,
  faPenToSquare,
  faUserMinus,
  faEnvelope,
  faPhone
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

  if (!selectedContact) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <FontAwesomeIcon icon={faUser} className="text-5xl mb-4 text-gray-300" />
        <p className="text-lg">Selecciona un contacto para ver sus detalles</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{selectedContact.name}</h2>
            {selectedContact.isFavorite && (
              <div className="flex items-center text-yellow-500 text-sm mt-1">
                <FontAwesomeIcon icon={solidStar} className="mr-1" />
                <span>Contacto favorito</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => handleEditContact(selectedContact)}
            onMouseEnter={() => setHoveredButton('edit')}
            onMouseLeave={() => setHoveredButton(null)}
            className="mr-2 p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full relative"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            {hoveredButton === 'edit' && (
              <span className="absolute whitespace-nowrap right-0 top-full mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                Editar
              </span>
            )}
          </button>
          
          <button
            onClick={() => addToFavorites(selectedContact._id)}
            onMouseEnter={() => setHoveredButton('favorite')}
            onMouseLeave={() => setHoveredButton(null)}
            className={`mr-2 p-2 hover:bg-gray-100 rounded-full relative ${
              selectedContact.isFavorite ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
            }`}
          >
            <FontAwesomeIcon icon={selectedContact.isFavorite ? solidStar : regularStar} />
            {hoveredButton === 'favorite' && (
              <span className="absolute whitespace-nowrap right-0 top-full mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                {selectedContact.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              </span>
            )}
          </button>
          
          <button
            onClick={() => deleteContactById(selectedContact._id)}
            className="p-2 bg-red-50 text-danger hover:bg-red-100 rounded-full"
          >
            <FontAwesomeIcon icon={faUserMinus} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faPhone} className="text-primary mr-3" />
          <div>
            <p className="text-xs text-gray-500">Teléfono</p>
            <p className="font-medium">{selectedContact.phoneNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faEnvelope} className="text-primary mr-3" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <a href={`mailto:${selectedContact.email}`} className="font-medium text-primary hover:underline">
              {selectedContact.email}
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-gray-700 mb-2">Notas</h3>
        <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto">
          {selectedContact.notes || <span className="text-gray-400">No hay notas para este contacto</span>}
        </div>
      </div>
    </div>
  )
}
