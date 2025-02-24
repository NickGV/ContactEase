export const Message = ({ message }) => {
  return (
    <div className={`message ${message.senderId === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
      <p>{message.content}</p>
      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  )
}
