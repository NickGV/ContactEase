import { useContext } from "react";
import { ContactDetails } from "./ContactDetails";
import { ContactList } from "./ContactList";
import { ContactsContext } from "../context/ContactsContext";
import { EditContactForm } from "./EditContactForm";
import { Favorites } from "./Favorites";

export const MainSection = ({ tab, toggleAddContactForm, handleTabChange }) => {
  const { editingContact } = useContext(ContactsContext);

  return (
    <main className="flex h-4/5 gap-3 lg:h-5/6">
      <div className="w-1/3 ">
        {tab === "contacts" && (
          <ContactList toggleAddContactForm={toggleAddContactForm} />
        )}
        {tab === "favorites" && <Favorites handleTabChange={handleTabChange} />}
      </div>
      <div className="w-2/3">
        {editingContact ? <EditContactForm /> : <ContactDetails />}
      </div>
    </main>
  );
};
