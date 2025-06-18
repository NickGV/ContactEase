import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as solidStar,
  faPenToSquare,
  faEnvelope,
  faPhone,
  faXmark,
  faComments,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import useContacts from '../../hooks/useContacts'
import { ChatContext } from '../../context/ChatContext'
import { InvitePopup } from '../layout/InvitePopup'

export const ContactDetails = () => {
  const [inviteContact, setInviteContact] = useState(null)
  const navigate = useNavigate()

  const {
    addToFavorites,
    handleEditContact,
    selectedContact,
    resetSelectedContact,
    deleteContactById
  } = useContacts()

  const { createOrGetChat } = useContext(ChatContext)

  const handleStartChat = async (contact) => {
    try {
      await createOrGetChat(contact.phoneNumber)
      navigate('/chat')
      resetSelectedContact()
      setInviteContact(null)
    } catch (error) {
      if (error === 'Contact not found') {
        setInviteContact(contact)
      }
    }
  }

  if (!selectedContact) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex flex-col m-auto items-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white  text-4xl font-bold">
                  {selectedContact.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800 text-center">
                  {selectedContact.name}
                </h2>
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
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-primary mr-3"
                />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-grow border-b border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Notas</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto">
                {selectedContact.notes || (
                  <span className="text-gray-400">
                    No hay notas para este contacto
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 mt-6 ">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-[#101728] text-white rounded-lg shadow hover:bg-[#232b3b] transition font-medium text-base justify-center "
                onClick={() => handleStartChat(selectedContact)}
              >
                <FontAwesomeIcon icon={faComments} />
                Iniciar Chat
              </button>
              <div className="flex gap-3 justify-between border-t border-gray-200 pt-4">
                <button
                  onClick={() => handleEditContact(selectedContact)}
                  className="flex gap-2 justify-center items-center mr-2 p-2 text-gray-500 hover:text-primary border w-full hover:bg-gray-100 rounded-lg relative"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => addToFavorites(selectedContact._id)}
                  className={`flex gap-2 justify-center items-center w-full  mr-2 p-2 border hover:bg-gray-100 rounded-lg relative ${
                    selectedContact.isFavorite
                      ? 'text-yellow-500'
                      : 'text-gray-500 hover:text-yellow-500'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={selectedContact.isFavorite ? solidStar : regularStar}
                  />
                  <span className="hidden md:inline">
                  {selectedContact.isFavorite
                    ? 'Quitar de favoritos'
                    : 'Añadir a favoritos'}
                  </span>
                </button>

                <button
                  onClick={() => deleteContactById(selectedContact._id)}
                  className="flex gap-2 justify-center items-center mr-2 p-2 bg-red-50 text-danger hover:bg-red-100 rounded-lg w-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={resetSelectedContact}
            className="flex justify-center items-center p-2 text-gray-500 hover:text-gray-700  hover:bg-gray-100 rounded-full absolute top-0 right-0 text-lg"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      {inviteContact && (
        <InvitePopup
          contact={inviteContact}
          onClose={() => setInviteContact(null)}
        />
      )}
    </>
  )
}
