import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactsContext } from '../../context/ContactsContext'
import { faArrowLeft, faUser, faUserPlus, faXmark, faArchive } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { SearchBar } from '../ui/SearchBar'
import useChat from '../../hooks/useChat'
import { InvitePopup } from '../layout/InvitePopup'
import { ContactChatSelector } from './ContactChatSelector'
import { toast } from 'sonner'

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

  const handleArchiveChat = async (e, contact) => {
    e.stopPropagation()
    const chat = chats.find(chat =>
      chat.participants.some(p => p.phoneNumber === contact.phoneNumber))
    if (chat) {
      await deleteChatById(chat._id)
    }
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
      <div className='pt-2'>
        <SearchBar />
      </div>
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
        <div className="flex flex-col w-full mt-8 ">
          <h2 className="hidden sm:block mb-2 sm:mb-3 text-base sm:text-lg md:text-xl text-white-headline font-bold p-1 sm:p-2">
            Contact List
          </h2>
          <ul className="w-full flex flex-col gap-1 relative">
            {chats.some((chat) => chat.hasNotification) && (
              <span className="absolute top-3 left-4 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
            {filteredChats.map((contact) => {
              const chat = chats.find(chat =>
                chat.participants.some(p => p.phoneNumber === contact.phoneNumber)
              )
              const lastMessage = chat?.messages?.[chat.messages.length - 1]?.content || 'No hay mensajes aún'

              return (
                <li
                  key={contact._id}
                  className={`
          flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
          ${selectedChat?.participants.some(p => p.phoneNumber === contact.phoneNumber)
            ? 'bg-gray-200'
            : 'hover:bg-gray-100'}
        `}
                  onClick={(e) => handleChatClick(e, contact)}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{contact.name}</p>
                    <p className="text-gray-500 text-sm truncate">{lastMessage}</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-orange-500 transition"
                    onClick={(e) => handleArchiveChat(e, contact)}
                    title="Archivar chat"
                  >
                    <FontAwesomeIcon icon={faArchive} />
                  </button>
                </li>
              )
            })}
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
          className="flex items-center text-center justify-center mt-2 text-white-btn-text bg-orange-btn hover:bg-primary hover:text-white rounded-full h-14 w-14 md:h-16 md:w-16 group-hover:scale-110 transition-all shadow-lg"
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
