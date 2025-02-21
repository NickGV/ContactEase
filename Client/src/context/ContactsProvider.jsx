import { useEffect, useState } from 'react'
import { ContactsContext } from './ContactsContext'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  )
  const [selectedContact, setSelectedContact] = useState(null)
  const [editingContact, setEditingContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchResultsFound, setSearchResultsFound] = useState(true)

  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }

  useEffect(() => {
    saveContactsToLocalStorage(contacts)
  }, [contacts])

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

  const addNewContact = (data) => {
    const newContact = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      notes: data.notes,
      isFavorite: false
    }
    setContacts([...contacts, newContact])
  }

  const deleteContact = (id) => {
    toast.error('Deleted')
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const handleSelectedContact = (contact) => {
    setEditingContact(null)
    if (selectedContact?.id === contact.id) {
      setSelectedContact(null)
    } else {
      setSelectedContact(contact)
    }
  }

  const addToFavorites = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id === id) {
          const updatedContact = {
            ...contact,
            isFavorite: !contact.isFavorite
          }
          toast.success(
            updatedContact.isFavorite
              ? 'Added to favorites'
              : 'Removed from favorites'
          )
          return updatedContact
        }
        return contact
      })
    )
  }

  const handleEditContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id)
    setEditingContact(contactToEdit)
  }

  const editContact = (editedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === editedContact.id ? editedContact : contact
      )
    )
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
        deleteContact,
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
