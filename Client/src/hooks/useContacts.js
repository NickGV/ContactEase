import { useContext } from 'react'
import { ContactsContext } from '../context/ContactsContext'

const useContacts = () => {
  return useContext(ContactsContext)
}

export default useContacts
