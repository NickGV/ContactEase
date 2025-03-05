import { useEffect, useState } from 'react'
import { ContactsContext } from './ContactsContext'
import { toast } from 'sonner'
import { addContact, getContacts, updateContact, deleteContact } from '../services/contactService'

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [editingContact, setEditingContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchResultsFound, setSearchResultsFound] = useState(true)

  const getUserContacts = async () => {
    const response = await getContacts()
    setContacts(response)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getUserContacts()
    }
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setSearchResultsFound(true)
    } else {
      const filteredContacts = contacts.filter((contact) =>
        Object.values(contact).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      setSearchResults(filteredContacts)
      setSearchResultsFound(filteredContacts.length > 0)
    }
  }, [searchTerm, contacts])

  const addNewContact = async (data) => {
    const newContact = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      isFavorite: false
    }
    await addContact(newContact)
    toast.success('Contact added')
    getUserContacts()
  }

  const deleteContactById = async (id) => {
    await deleteContact(id)
    getUserContacts()
    toast.error('Deleted')
  }

  const handleSelectedContact = (contact) => {
    setEditingContact(null)
    if (selectedContact?.id === contact.id) {
      setSelectedContact(null)
    } else {
      setSelectedContact(contact)
    }
  }

  const addToFavorites = async (id) => {
    const contact = contacts.find((contact) => contact.id === id)

    try {
      await updateContact({ id, isFavorite: !contact.isFavorite })
      getUserContacts()
    } catch (error) {
      return toast.error(error.response.data)
    }

    toast.success(
      contact.isFavorite
        ? 'Added to favorites'
        : 'Removed from favorites'
    )
  }

  const handleEditContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id)
    setEditingContact(contactToEdit)
  }

  const editContact = async (editedContact) => {
    try {
      await updateContact(editedContact)
      getUserContacts()
    } catch (error) {
      return toast.error(error.response.data)
    }

    toast.success('Contact updated')
    setEditingContact(null)
  }

  const resetSelectedContact = () => {
    setSelectedContact(null)
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts: searchTerm.trim() === '' ? contacts : searchResults,
        setContacts,
        addNewContact,
        handleSelectedContact,
        addToFavorites,
        deleteContactById,
        editingContact,
        setEditingContact,
        handleEditContact,
        editContact,
        searchTerm,
        setSearchTerm,
        searchResultsFound,
        resetSelectedContact,
        selectedContact
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}
