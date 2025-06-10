import { ChatSidebar } from '../components/chat/ChatSidebar'
import { ChatWindow } from '../components/chat/ChatWindow'
import useChat from '../hooks/useChat'

export const ChatPage = () => {
  const { selectedChat } = useChat()
  return (
    <div className="container mx-auto px-0 sm:px-2 md:px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-4 pt-4">Chat</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-7rem)]">
          <div className={`${selectedChat ? 'hidden md:block md:w-1/3 lg:w-1/4' : 'w-full'} transition-all duration-300`}>
            <ChatSidebar />
          </div>
          {selectedChat && (
            <div className="w-full h-full md:flex-1 flex flex-col transition-all duration-300">
              <ChatWindow />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
