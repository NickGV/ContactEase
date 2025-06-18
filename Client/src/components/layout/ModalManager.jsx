import useContacts from '../../hooks/useContacts'
import { EditContactForm } from '../contacts/EditContactForm'
import { ContactDetails } from '../contacts/ContactDetails'

export const ModalManager = () => {
  const { selectedContact, editingContact } = useContacts()
  if (!selectedContact) return null
  return editingContact ? <EditContactForm /> : <ContactDetails />
}
