import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactsContext } from '../context/ContactsContext'
import { faArrowLeft, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { SearchBar } from './SearchBar'
import useChat from '../hooks/useChat'
import { InvitePopup } from './InvitePopup'
import { ContactChatSelector } from './ContactChatSelector'

export const ChatSidebar = () => {
  const {
    contacts, searchTerm, setSearchTerm, searchResultsFound
  } = useContext(ContactsContext)
  const { createOrGetChat, selectedChat, chats, deleteChatById, setChats, setSelectedChat } = useChat()
  const [showInvitePopup, setShowInvitePopup] = useState(false)
  const [inviteContact, setInviteContact] = useState(null)
  const [showContactSelector, setShowContactSelector] = useState(false)

  const activeChats = contacts.filter(contact =>
    chats.some(chat =>
      chat.participants.some(
        participant => participant.phoneNumber === contact.phoneNumber
      )
    )
  )

  const filteredChats = activeChats.filter(contact => {
    if (searchTerm.trim() === '') {
      return true
    }
    return Object.values(contact).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleChatClick = async (e, contact) => {
    e.stopPropagation()
    if (selectedChat) {
      setSelectedChat(null)
      return
    }
    try {
      const response = await createOrGetChat(contact.phoneNumber)
      if (response.chat) {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === response.chat._id ? { ...chat, hasNotification: false } : chat
          )
        )
      }
    } catch (error) {
      console.error('Error in handleChatClick:', error)
    }
  }

  const handleDeleteChat = async (e, contact) => {
    e.stopPropagation()
    if (!selectedChat) {
      const response = await createOrGetChat(contact.phoneNumber)
      const chatId = response.chat._id
      await deleteChatById(chatId)
      return
    }
    await deleteChatById(selectedChat._id)
  }

  const handleNewChatClick = async (contact) => {
    try {
      await createOrGetChat(contact.phoneNumber)
      setShowContactSelector(false)
    } catch (error) {
      if (error === 'Contact not found') {
        setInviteContact(contact)
        setShowInvitePopup(true)
        setShowContactSelector(false)
      }
    }
  }

  return (
    <div className='relative m-w-full w-11/12 overflow-x-auto md:overflow-y-auto pt-1 px-2'>
      <SearchBar />
      {!searchResultsFound
        ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-sm md:text-2xl mt-4">
            there is no contact with:
            <span className="font-bold"> {searchTerm}</span>
          </h1>
          <button
            className="underline text-link text-sm md:text-xl"
            onClick={() => setSearchTerm('')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Return
          </button>
        </div>
          )
        : filteredChats && filteredChats.length > 0
          ? (
        <div className="flex md:flex-col">
          <h2 className="hidden md:block mb-3 text-xl text-white-headline font-bold p-2">
            Contact List
          </h2>
          <ul className={`m-w-full flex md:grid ${selectedChat ? 'md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {filteredChats.map((contact) => (
              <li className="md:border-b" key={contact._id}>
                <div
                  className={`relative flex gap-3 md:justify-between p-4 md:bg-black-bg hover:cursor-pointer hover:opacity-90 hover:scale-105 transition-all w-20 md:w-full rounded-lg ${
                    selectedChat?.participants.some(participant => participant._id === contact._id) ? 'md:bg-slate-700' : ''
                  }`}
                  onClick={(e) => handleChatClick(e, contact)}
                >
                  {chats.find(chat => chat.participants.some(p => p._id === contact.userId))?.hasNotification && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  <div className="flex flex-col md:flex-row md:gap-3 items-center w-full">
                    <div className="w-15 flex justify-center items-center text-3xl md:text-5xl text-white-btn-text bg-black-bg md:bg-transparent border rounded-full h-16 w-16 md:h-14 md:w-14 p-4">
                      <FontAwesomeIcon icon={faUser} className="w-6" />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-bold text-white text-sm md:text-lg">
                        {contact.name}
                      </p>
                      <p className="hidden md:block md:text-md lg:text-lg">{contact.phoneNumber}</p>
                      <a href={`mailto:${contact.email}`} className="hidden md:block text-sm xl:text-lg text-link underline">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    className="hidden md:block absolute text-xl top-0 right-0 mr-2 text-gray-300 hover:text-red-500 hover:scale-110 transition-all"
                    onClick={(e) => handleDeleteChat(e, contact)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
            )
          : (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-center text-sm md:text-lg lg:text-xl mx-auto mt-10">
            There is nothing here yet, try to add a new contact
          </h1>
        </div>
            )}
      {showInvitePopup && (
        <InvitePopup contact={inviteContact} onClose={() => setShowInvitePopup(false)} />
      )}
      <div className="absolute bottom-12 right-12 flex flex-col items-center justify-center group">
        <span className="group opacity-0 text-white text-center text-xs md:text-lg mt-3 group-hover:opacity-100 transition-opacity bg-black-bg rounded-lg p-1">
          Add chat
        </span>
        <button
          className="group flex items-center text-center justify-center mt-3 text-white-btn-text bg-black-bg rounded-full h-16 w-16 group-hover:scale-110 transition-all"
          onClick={() => setShowContactSelector(!showContactSelector)}
        >
          <FontAwesomeIcon icon={faUserPlus} className="text-3xl" />
        </button>
      </div>
      {showContactSelector && (
        <ContactChatSelector
          contacts={contacts}
          onSelectContact={handleNewChatClick}
          onClose={() => setShowContactSelector(false)}
        />
      )}
    </div>
  )
}
