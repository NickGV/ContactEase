import { useEffect, useState } from 'react'
import { ContactsContext } from './ContactsContext'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  )
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
      isFavorite: false,
      isSelected: false
    }
    setContacts([...contacts, newContact])
  }

  const deleteContact = (id) => {
    toast.error('Deleted')
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const handleSelectedContact = (id) => {
    setEditingContact(null)
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id === id) {
          return {
            ...contact,
            isSelected: !contact.isSelected
          }
        } else {
          return { ...contact, isSelected: false }
        }
      })
    )
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
    const contactToId = contacts.find((contact) => contact.id === id)
    setEditingContact(contactToId)
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
    setContacts((prevContacts) =>
      prevContacts.map((contact) => ({ ...contact, isSelected: false }))
    )
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
        resetSelectedContact
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}
