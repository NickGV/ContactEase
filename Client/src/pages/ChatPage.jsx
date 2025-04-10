import { ChatSidebar } from '../components/ChatSidebar'
import { ChatWindow } from '../components/ChatWindow'
import useChat from '../hooks/useChat'

export const ChatPage = () => {
  const { selectedChat } = useChat()
  return (
    <main className="flex flex-col md:flex-row h-[calc(100vh-6rem)] overflow-hidden mx-2 sm:mx-3 md:mx-4 my-2 sm:my-3 md:my-4">
        <div className={`w-full ${selectedChat ? 'hidden md:flex sm:h-2/5 md:h-full md:w-1/3 lg:w-1/4' : 'h-full'} transition-all duration-300`}>
            <ChatSidebar />
        </div>
        {selectedChat && (
          <div className="w-full h-full md:flex-1 flex flex-col transition-all duration-300">
            <ChatWindow/>
          </div>
        )}
    </main>
  )
}
