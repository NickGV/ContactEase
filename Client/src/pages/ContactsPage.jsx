import { ContactList } from '../components/contacts/ContactList'
import { ContactDetails } from '../components/contacts/ContactDetails'
import { EditContactForm } from '../components/contacts/EditContactForm'
import { AddContactForm } from '../components/contacts/AddContactForm'
import useContacts from '../hooks/useContacts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchBar } from '../components/ui/SearchBar'
import PropTypes from 'prop-types'

export const ContactPage = ({ toggleAddContactForm, showForm }) => {
  const { editingContact, selectedContact } = useContacts()

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contactos</h1>
        <button
          onClick={toggleAddContactForm}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} /> Añadir Contacto
        </button>
      </div>

      <SearchBar />

      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <div className="flex flex-col md:flex-row h-[calc(100vh-12rem)]">
          <div
            className="border-r border-gray-200 w-full overflow-y-auto"
          >
            <ContactList toggleAddContactForm={toggleAddContactForm} />
          </div>

         
        </div>
      </div>

      <AddContactForm showForm={showForm} onClose={toggleAddContactForm} />
    </div>
  )
}

ContactPage.propTypes = {
  toggleAddContactForm: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired
}
