import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import useFormValidation from '../../hooks/useForm'
import useContacts from '../../hooks/useContacts'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

export const EditContactForm = ({ onClose }) => {
  const { editingContact, editContact } = useContacts()

  const INITIAL_STATE = {
    name: editingContact?.name || '',
    email: editingContact?.email || '',
    phoneNumber: editingContact?.phoneNumber || '',
    notes: editingContact?.notes || ''
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = 'The name is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'The email is not valid'
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
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
    onClose()
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 sm:gap-3 items-center">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`font-bold text-base sm:text-lg md:text-2xl mb-1 bg-transparent border-b border-gray-500 w-full ${
                    errors.name ? 'border border-red-500' : ''
                  } outline-none focus:border-blue-500 px-1 py-0.5`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>
                )}
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`text-sm sm:text-base md:text-xl bg-transparent border-b border-gray-500 w-full ${
                    errors.phoneNumber ? 'border border-red-500' : ''
                  } outline-none focus:border-blue-500 px-1 py-0.5`}
                  placeholder="Phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs sm:text-sm">{errors.phoneNumber}</p>
                )}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`text-link underline text-sm sm:text-base md:text-xl bg-transparent border-b border-gray-500 w-full ${
                    errors.email ? 'border border-red-500' : ''
                  } outline-none focus:border-blue-500 px-1 py-0.5`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <h2 className="text-gray-700 font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
            Additional Notes
          </h2>
          <div className="overflow-y-auto flex-grow mb-4 sm:mb-6 md:mb-8 lg:mb-10 border rounded-sm p-2 sm:p-3 md:p-4">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="overflow-y-auto w-full h-full min-h-[100px] bg-transparent border-b border-gray-500 outline-none focus:border-blue-500 resize-none p-1"
              placeholder="Add notes here..."
            />
          </div>
          <div className="mt-auto">
            <div className="flex justify-end space-x-2 gap-2 sm:gap-3 md:gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs sm:text-sm w-full sm:w-auto px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500 border transition-all hover:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

EditContactForm.propTypes = {
  onClose: PropTypes.func.isRequired
}
