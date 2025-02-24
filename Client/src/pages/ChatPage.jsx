import { ChatSidebar } from '../components/ChatSidebar'
import { ChatWindow } from '../components/ChatWindow'

export const ChatPage = () => {
  const selectedChat = true
  const chatId = '1'
  return (
    <main className="flex flex-col md:flex-row h-4/6 md:gap-2 md:h-5/6 xl:h-87 m-4">
        <div className={`w-full ${selectedChat ? 'md:w-1/3' : 'md:w-full'} h-36 md:h-95 lg:h-full md:flex justify-center`}>
            <ChatSidebar />
        </div>
        {selectedChat && (
          <div className="w-full h-5/6 md:h-95 lg:h-full flex flex-col flex-1 item-center ">
            <ChatWindow chatId={chatId}/>
          </div>
        )}
    </main>
  )
}
