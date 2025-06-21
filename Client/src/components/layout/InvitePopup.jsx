import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const InvitePopup = ({ contact, onClose }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText('http://localhost:5173/register')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Invite {contact.name}</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <p className="mb-4">This contact is not part of the app, invite them so you can chat.</p>
        <button
          onClick={handleCopyLink}
          className="w-full p-2 bg-blue-500 text-white font-bold rounded-lg transition-colors duration-300 hover:bg-blue-600"
        >
          {copied ? 'Link Copied!' : 'Copy Invite Link'}
        </button>
      </div>
    </div>
  )
}

InvitePopup.propTypes = {
  contact: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}
