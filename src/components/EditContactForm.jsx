import { useContext, useState } from "react";
import { ContactsContext } from "../context/ContactsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import useFormValidation from "../hooks/useForm";

export const EditContactForm = () => {
  const { editingContact, editContact } = useContext(ContactsContext);

  const contactSelected = editingContact;

  const INITIAL_STATE = {
    name: editingContact?.name || "",
    email: editingContact?.email || "",
    phoneNumber: editingContact?.phoneNumber || "",
    notes: editingContact?.notes || "",
  };

  const validateForm = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "The name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "The email is not valid";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }

    return errors;
  };

  const handleEdit = (formData) => {
    const editedContact = {
      ...editingContact,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      notes: formData.notes,
    };

    editContact(editedContact);
  };

  const { formData, errors, handleChange, handleSubmit } = useFormValidation(
    INITIAL_STATE,
    validateForm,
    handleEdit
  );

  return (
    <div className="h-full mr-4 mb-4 mt-4 p-3 shadow-md shadow-slate-400 rounded-md flex flex-col bg-black-bg border-2 border-orange-400">
      {!contactSelected ? (
        <div className="text-center text-2xl mt-5">xd</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex  gap-3 items-center mb-4">
            <div className="w-25 text-7xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="flex flex-col ">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`font-bold text-2xl mb-1 bg-transparent border-b border-gray-500  ${
                  errors.name && "border border-red-500"
                } outline-none focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`text-xl bg-transparent border-b  border-gray-500  ${
                  errors.phoneNumber && "border border-red-500"
                } outline-none focus:border-blue-500`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`text-link underline text-xl bg-transparent border-b border-gray-500  ${
                  errors.email && "border border-red-500"
                } outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          <h2 className=" text-white-headline font-bold text-2xl mb-3">
            Additional Notes
          </h2>
          <div className="overflow-y-auto max-h-3/4 mb-10 border-b rounded-sm p-4 ">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="overflow-y-auto w-full h-full bg-transparent border-b border-gray-500 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <div className="mt-auto flex justify-end space-x-2 gap-4">
              <button
                type="submit"
                className="text-white-btn-text bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500 border "
              >
                Edit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
