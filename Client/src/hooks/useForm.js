import { useState } from 'react'

const useFormValidation = (initialState, validate, onSubmit) => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData)
      setFormData(initialState)
    }
  }

  return { formData, errors, handleChange, handleSubmit }
}

export default useFormValidation
