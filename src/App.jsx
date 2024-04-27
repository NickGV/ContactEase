import { Header } from "./components/Header";
import { Toaster } from "sonner";
import { AddContactForm } from "./components/AddContactForm";
import { useState } from "react";
import { ContactsProvider } from "./context/ContactsProvider";
import { MainSection } from "./components/MainSection";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("contacts");

  const toggleAddContactForm = () => {
    setShowForm(!showForm);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ContactsProvider>
        <Toaster richColors closeButton />
        <Header toggleAddContactForm={toggleAddContactForm} />
        <MainSection
          tab={activeTab}
          toggleAddContactForm={toggleAddContactForm}
          handleTabChange={handleTabChange}
        />

        <nav className="shadow-sm shadow-slate-400 p-3 mt-8 bg-black-bg h-16">
          <ul className="flex gap-4 text-xl">
            <li
              className={`transition-all hover:text-orange-400 cursor-pointer ${
                activeTab === "contacts" ? "text-orange-400" : ""
              }`}
            >
              <button onClick={() => handleTabChange("contacts")}>
                Contact list
              </button>
            </li>
            <li
              className={`transition-all hover:text-orange-400 cursor-pointer ${
                activeTab === "favorites" ? "text-orange-400" : ""
              }`}
            >
              <button onClick={() => handleTabChange("favorites")}>
                Favorites
              </button>
            </li>
          </ul>
        </nav>

        <AddContactForm showForm={showForm} onClose={toggleAddContactForm} />
      </ContactsProvider>
    </>
  );
}

export default App;
