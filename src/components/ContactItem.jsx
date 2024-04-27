import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { ContactsContext } from "../context/ContactsContext";

export const ContactItem = ({
  id,
  name,
  email,
  phoneNumber,
  isSelected,
  isFavorite,
}) => {
  const {
    handleSelectedContact,
    addToFavorites,
    deleteContact,
    handleEditContact,
  } = useContext(ContactsContext);

  const handleFavoritesClick = (e) => {
    e.stopPropagation();
    addToFavorites(id);
  };

  const editingContact = (e) => {
    e.stopPropagation();
    handleEditContact(id);
  };
  return (
    <>
      <div
        className={`relative flex gap-3  justify-between p-3 hover:bg-slate-900 hover:cursor-pointer ${
          isSelected ? "bg-slate-900" : ""
        }`}
        onClick={() => handleSelectedContact(id)}
      >
        <div className="flex  gap-3 items-center  w-full">
          <div className="w-15 text-5xl">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <p className="font-bold">{name}</p>
            <p>{phoneNumber}</p>
            <a href={email} className="text-link underline">
              {email}
            </a>
          </div>
        </div>
        <div className="flex items-end gap-3 relative">
          <button
            className={`text-2xl flex items-center relative hover:scale-150 transition-all ${
              isFavorite ? "text-yellow-500" : "text-gray-500"
            }`}
            title="Agregar a favoritos (Agregar a lista de favoritos)"
            onClick={handleFavoritesClick}
          >
            {isFavorite ? (
              <FontAwesomeIcon icon={solidStar} className="text-yellow-500" />
            ) : (
              <FontAwesomeIcon icon={regularStar} className="text-yellow-500" />
            )}
          </button>
          <button
            className="text-gray-500 text-2xl flex items-center relative hover:scale-150 transition-all"
            title="Editar (Editar contacto)"
            onClick={editingContact}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <button
          className="absolute text-xl top-0 right-0 mr-2 text-gray-600 hover:text-gray-800"
          onClick={() => deleteContact(id)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </>
  );
};
