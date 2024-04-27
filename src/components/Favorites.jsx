import { useContext } from "react";
import { ContactItem } from "./ContactItem";
import { ContactsContext } from "../context/ContactsContext";

export const Favorites = ({ handleTabChange }) => {
  const { contacts } = useContext(ContactsContext);
  const favoritesContacts = contacts.filter((contact) => contact.isFavorite);

  return (
    <div className="shadow-md shadow-slate-400 ml-4 mb-4 mt-4  rounded-md h-full bg-black-bg border-2 border-orange-400 overflow-y-auto">
      {favoritesContacts && favoritesContacts.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xl text-white-headline font-bold p-2">
            Favorites
          </h2>
          <ul>
            {favoritesContacts.map((contact) => (
              <li className="border-b" key={contact.id}>
                <ContactItem
                  id={contact.id}
                  name={contact.name}
                  email={contact.email}
                  phoneNumber={contact.phoneNumber}
                  isFavorite={contact.isFavorite}
                  isSelected={contact.isSelected}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-center text-xl mx-auto mt-10">
            You have no one favorite contact, try to make one your favorite
          </h1>
          <button
            className="underline text-link hover:scale-110 "
            onClick={() => handleTabChange("contacts")}
          >
            Go back to contact list
          </button>
        </div>
      )}
    </div>
  );
};
