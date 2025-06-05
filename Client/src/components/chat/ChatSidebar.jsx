import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactsContext } from '../../context/ContactsContext'
import { faArrowLeft, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { SearchBar } from '../ui/SearchBar'
import useChat from '../../hooks/useChat'
import { InvitePopup } from '../layout/InvitePopup'
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
    <div className='relative w-full h-full overflow-x-hidden overflow-y-auto pt-1 px-2 sm:px-3 md:px-4'>
      <SearchBar />
      {!searchResultsFound
        ? (
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 py-4">
          <h1 className="text-center text-sm sm:text-base md:text-xl lg:text-2xl mt-2 sm:mt-3 md:mt-4">
            there is no contact with:
            <span className="font-bold"> {searchTerm}</span>
          </h1>
          <button
            className="underline text-link  sm:text-sm md:text-base lg:text-xl"
            onClick={() => setSearchTerm('')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1 sm:mr-2" />
            Return
          </button>
        </div>
          )
        : filteredChats && filteredChats.length > 0
          ? (
        <div className="flex flex-col w-full mt-8">
          <h2 className="hidden sm:block mb-2 sm:mb-3 text-base sm:text-lg md:text-xl text-white-headline font-bold p-1 sm:p-2">
            Contact List
          </h2>
          <ul className={`w-full grid grid-cols-1 ${selectedChat ? 'sm:grid-cols-1' : 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-2 sm:gap-3 md:gap-4`}>
            {filteredChats.map((contact) => (
              <li className="border-b border-gray-800" key={contact._id}>
                <div
                  className={`relative flex gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-black-bg hover:cursor-pointer hover:opacity-90 hover:scale-105 transition-all w-full rounded-lg ${
                    selectedChat?.participants.some(participant => participant._id === contact._id) ? 'bg-slate-800 md:bg-slate-700' : ''
                  }`}
                  onClick={(e) => handleChatClick(e, contact)}
                >
                  {chats.find(chat => chat.participants.some(p => p._id === contact.userId))?.hasNotification && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  <div className="flex flex-row items-center w-full">
                    <div className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white-btn-text bg-black-bg md:bg-transparent border rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 p-2 sm:p-3 md:p-4">
                      <FontAwesomeIcon icon={faUser} className="w-4 sm:w-5 md:w-6" />
                    </div>
                    <div className="text-left pl-2 overflow-hidden flex-1">
                      <p className="font-bold text-white  sm:text-sm md:text-base lg:text-lg truncate">
                        {contact.name}
                      </p>
                      <p className=" sm:text-sm md:text-base truncate">{contact.phoneNumber}</p>
                      <a href={`mailto:${contact.email}`} className=" sm:text-sm md:text-base text-link underline truncate block">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    className="absolute text-sm sm:text-base md:text-lg lg:text-xl top-1 right-1 text-gray-300 hover:text-red-500 hover:scale-110 transition-all"
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
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
          <h1 className="text-center  sm:text-sm md:text-base lg:text-xl mx-auto mt-4 sm:mt-6 md:mt-10">
            There is nothing here yet, try to add a new contact
          </h1>
        </div>
            )}
      {showInvitePopup && (
        <InvitePopup contact={inviteContact} onClose={() => setShowInvitePopup(false)} />
      )}
      <div className={`${selectedChat ? 'hidden' : 'flex'} fixed bottom-4 sm:bottom-8 md:bottom-12 right-4 sm:right-8 md:right-12 flex flex-col items-center justify-center group z-10`}>
        <span className="opacity-0 text-white text-center  sm:text-sm md:text-base mt-2 sm:mt-3 group-hover:opacity-100 transition-opacity bg-black-bg rounded-lg p-1">
          Add chat
        </span>
        <button
          className="flex items-center text-center justify-center mt-2 text-white-btn-text bg-orange-btn hover:bg-orange-500 rounded-full h-14 w-14 md:h-16 md:w-16 group-hover:scale-110 transition-all shadow-lg"
          onClick={() => setShowContactSelector(!showContactSelector)}
        >
          <FontAwesomeIcon icon={faUserPlus} className="text-2xl md:text-3xl"/>
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
