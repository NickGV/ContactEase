import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchBar } from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const Header = ({ toggleAddContactForm }) => {
  return (
    <div className="flex flex-col md:flex-row items-center  justify-between p-4 ">
      <div className="flex flex-col w-full md:flex-row justify-center md:justify-end items-center gap-3 mt-4 md:mt-0">
        <SearchBar />
        <button
          type="button"
          className="hidden md:block py-3 px-5 text-sm font-medium text-white-btn-text focus:outline-none bg-orange-btn rounded-lg border border-gray-200 hover:bg-orange-500 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all hover:scale-95 w-64"
          onClick={toggleAddContactForm}
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Add New Contact
        </button>
      </div>
    </div>
  )
}
