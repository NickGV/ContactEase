import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFormValidation from '../../hooks/useForm'
import useContacts from '../../hooks/useContacts'
import PropTypes from 'prop-types'

export const AddContactForm = ({ showForm, onClose }) => {
  const { addNewContact } = useContacts()

  const INITIAL_STATE = {
    name: '',
    email: '',
    phoneNumber: '',
    notes: ''
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

  const handleSubmitForm = (formData) => {
    addNewContact(formData)
    onClose()
  }

  const { formData, errors, handleChange, handleSubmit } = useFormValidation(
    INITIAL_STATE,
    validateForm,
    handleSubmitForm
  )

  if (!showForm) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Add New Contact</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.name ? 'border-red-500' : ''
                }`}
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
                placeholder=" "
                required
              />
              <label
                htmlFor="phoneNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="notes"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Leave a note..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add new contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

AddContactForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
