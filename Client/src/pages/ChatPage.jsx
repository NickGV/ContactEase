import { ChatSidebar } from '../components/chat/ChatSidebar'
import { ChatWindow } from '../components/chat/ChatWindow'
import useChat from '../hooks/useChat'

export const ChatPage = () => {
  const { selectedChat } = useChat()
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Chat</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-12rem)]">
          <div className={`${selectedChat ? 'md:w-1/3 lg:w-1/4 border-r border-gray-200' : 'w-full'} transition-all duration-300`}>
            <ChatSidebar />
          </div>

          {selectedChat && (
            <div className="w-full h-full md:flex-1 flex flex-col transition-all duration-300">
              <ChatWindow/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
