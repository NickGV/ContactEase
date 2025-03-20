import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { addContact, getContacts, updateContact, deleteContact, getContactById } from '../services/contactService'
import useAuth from '../hooks/useAuth'

export const ContactsContext = createContext()

export const ContactsProvider = ({ children }) => {
  const { user } = useAuth()
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
    if (user) {
      getUserContacts()
    }
  }, [user])

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
      phoneNumber: data.phoneNumber,
      notes: data.notes,
      isFavorite: false
    }
    try {
      await addContact(newContact)
      toast.success('Contact added')
      getUserContacts()
    } catch (error) {
      return toast.error(error)
    }
  }

  const deleteContactById = async (id) => {
    await deleteContact(id)
    getUserContacts()
    toast.error('Deleted')
    setSelectedContact(null)
  }

  const handleSelectedContact = (contact) => {
    setEditingContact(null)
    if (selectedContact?._id === contact._id) {
      setSelectedContact(null)
    } else {
      setSelectedContact(contact)
    }
  }

  const addToFavorites = async (id) => {
    const contact = await getContactById(id)
    const isFavorite = !contact.isFavorite
    const data = {
      id,
      isFavorite
    }
    try {
      const UptdatedContact = await updateContact(data)
      setSelectedContact(UptdatedContact)
      getUserContacts()
    } catch (error) {
      return toast.error(error)
    }

    toast.success(
      contact.isFavorite
        ? 'Removed from favorites'
        : 'Added to favorites'
    )
  }

  const handleEditContact = (contact) => {
    if (editingContact?._id === contact._id) {
      setEditingContact(null)
    } else {
      setSelectedContact(contact)
      setEditingContact(contact)
    }
  }

  const editContact = async (editedContact) => {
    try {
      await updateContact(editedContact)
      getUserContacts()
      setSelectedContact(editedContact)
    } catch (error) {
      return toast.error(error)
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
