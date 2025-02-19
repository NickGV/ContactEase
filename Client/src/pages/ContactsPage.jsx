import { useContext } from 'react'
import { ContactsContext } from '../context/ContactsContext'
import { ContactList } from '../components/ContactList'
import { ContactDetails } from '../components/ContactDetails'
import { EditContactForm } from '../components/EditContactForm'
import { Favorites } from '../components/Favorites'
import { AddContactForm } from '../components/AddContactForm'

export const ContactPage = ({ tab, toggleAddContactForm, handleTabChange, showForm }) => {
  const { editingContact, resetSelectedContact } = useContext(ContactsContext)

  const handleTabChangeWithReset = (tab) => {
    resetSelectedContact()
    handleTabChange(tab)
  }

  return (
    <main className="flex flex-col md:flex-row h-4/6 md:gap-2 md:h-5/6 xl:h-87">
      <div className="w-full h-36 md:h-95 lg:h-full  md:w-30 md:flex ">
        {tab === 'contacts' && (
          <ContactList toggleAddContactForm={toggleAddContactForm} />
        )}
        {tab === 'favorites' && (
          <Favorites
            handleTabChange={handleTabChangeWithReset}
            toggleAddContactForm={toggleAddContactForm}
          />
        )}
      </div>
      <div className="w-full h-5/6 md:h-95 lg:h-full  md:w-2/3 flex flex-col flex-1 item-center">
        {editingContact ? <EditContactForm /> : <ContactDetails />}
      </div>
      <AddContactForm showForm={showForm} onClose={toggleAddContactForm} />

    </main>
  )
}
