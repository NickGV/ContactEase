import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ContactsContext } from '../../context/ContactsContext'

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(ContactsContext)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className="w-full mb-4">
      <div className="flex w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 px-4 text-dark-6 outline-none transition focus:border-white ring-white ring-1 focus:ring-orange-400">
        <input
          type="text"
          placeholder="Buscar contactos"
          onChange={handleSearchChange}
          value={searchTerm}
          className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="button"
          className="px-3 py-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  )
}
