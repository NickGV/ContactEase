import { useContext, useEffect } from 'react'
import { ContactsContext } from '../context/ContactsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useFormValidation from '../hooks/useForm'

export const EditContactForm = () => {
  const { editingContact, editContact } = useContext(ContactsContext)

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

  return (
    <div className="w-auto h-4/6 md:h-full mx-2 md:mr-4 md:mb-4 md:mt-4 p-3 shadow-md shadow-slate-400 rounded-md flex flex-col bg-black-bg border-2 border-orange-400 flex-1">
      {!editingContact
        ? (
        <div className="text-center text-2xl mt-5">No contact selected</div>
          )
        : (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center mb-4">
            <div className="w-25 text-5xl md:text-7xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`font-bold  md:text-2xl mb-1 bg-transparent border-b border-gray-500  ${
                  errors.name && 'border border-red-500'
                } outline-none focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`md:text-xl bg-transparent border-b  border-gray-500  ${
                  errors.phoneNumber && 'border border-red-500'
                } outline-none focus:border-blue-500`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`text-link underline md:text-xl bg-transparent border-b border-gray-500  ${
                  errors.email && 'border border-red-500'
                } outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          <h2 className=" text-white-headline font-bold md:text-2xl mb-3">
            Additional Notes
          </h2>
          <div className="overflow-y-auto max-h-3/4 md:mb-10 border-b rounded-sm p-4 ">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="overflow-y-auto w-full h-full bg-transparent border-b border-gray-500 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <div className="mt-3 md:mt-auto flex justify-end space-x-2 gap-4">
              <button
                type="submit"
                className="text-white-btn-text bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500 border "
              >
                Edit
              </button>
            </div>
          </div>
        </form>
          )}
    </div>
  )
}
