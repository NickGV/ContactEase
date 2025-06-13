import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPhone,
  faXmark,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import useFormValidation from '../../hooks/useForm'
import useContacts from '../../hooks/useContacts'

export const EditContactForm = () => {
  const { editingContact, editContact, resetSelectedContact } = useContacts()

  const INITIAL_STATE = {
    name: editingContact?.name || '',
    email: editingContact?.email || '',
    phoneNumber: editingContact?.phoneNumber || '',
    notes: editingContact?.notes || ''
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = 'El nombre es requerido'
    }

    if (!values.email) {
      errors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'El email no es válido'
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'El número de teléfono es requerido'
    }

    return errors
  }

  const handleEdit = (formData) => {
    const editedContact = {
      ...editingContact,
      id: editingContact._id,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      notes: formData.notes
    }

    editContact(editedContact)
  }

  const { formData, errors, handleChange, handleSubmit, setFormData } = useFormValidation(
    INITIAL_STATE,
    validateForm,
    handleEdit
  )

  useEffect(() => {
    setFormData({
      name: editingContact?.name || '',
      email: editingContact?.email || '',
      phoneNumber: editingContact?.phoneNumber || '',
      notes: editingContact?.notes || ''
    })
  }, [editingContact, setFormData])

  if (!editingContact) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex flex-col m-auto items-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold mb-2">
                {formData.name ? formData.name.charAt(0) : ''}
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`text-xl font-bold text-center w-full bg-transparent border-b ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-light focus:outline-none px-2 py-1`}
                  placeholder="Nombre"
                />
                {errors.name && (
                  <p className="absolute text-xs text-red-500 text-center w-full mt-1">{errors.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <FontAwesomeIcon icon={faPhone} className="text-primary mr-3 mt-5" />
              <div className="w-full">
                <p className="text-xs text-gray-500">Teléfono</p>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`font-medium w-full bg-transparent border-b ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-light focus:outline-none px-0 py-1`}
                  placeholder="Número de teléfono"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-primary mr-3 mt-5"
              />
              <div className="w-full">
                <p className="text-xs text-gray-500">Email</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`font-medium text-primary w-full bg-transparent border-b ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-primary-light focus:outline-none px-0 py-1`}
                  placeholder="Correo electrónico"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-grow border-b border-gray-200 mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Notas</h3>
            <div className="bg-gray-50 rounded-lg p-4 h-48">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full h-full bg-transparent resize-none focus:outline-none"
                placeholder="No hay notas para este contacto"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg shadow hover:bg-primary-light transition font-medium text-base justify-center"
            >
              <FontAwesomeIcon icon={faSave} />
              Guardar Cambios
            </button>
          </div>
        </form>

        <button
          onClick={resetSelectedContact}
          type="button"
          className="flex justify-center items-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full absolute top-0 right-0 text-lg"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  )
}
