import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faFloppyDisk, faLock, faLockOpen, faPhone, faSignOutAlt, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../components/ui/Input'
import useFormValidation from '../hooks/useForm'
import useAuth from '../hooks/useAuth'

export const AccountPage = () => {
  const { user, handleLogout, handleDeleteUser, handleUpdateUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const INITIAL_STATE = {
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    currentPassword: '',
    newPassword: ''
  }

  const validateForm = (values) => {
    const errors = {}

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'The email is not valid'
    }

    if (!values.currentPassword) {
      errors.currentPassword = 'Current password is required to change password'
    }

    if (!values.newPassword) {
      errors.newPassword = 'New password is required to change password'
    }

    return errors
  }

  const handleSubmitForm = (formData) => {
    const { username, email, phoneNumber, currentPassword, newPassword } = formData
    handleUpdateUser(username, email, phoneNumber, currentPassword, newPassword)
  }

  const { formData, errors, handleChange, handleSubmit, setFormData } = useFormValidation(
    INITIAL_STATE,
    validateForm,
    handleSubmitForm
  )

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        currentPassword: '',
        newPassword: ''
      })
    }
  }, [user])

  return (
    <section className='m-auto p-6 max-w-3xl'>
      <div className='flex items-center gap-2 mb-4'>
        <FontAwesomeIcon icon={faUser} className='text-3xl'/>
        <h1 className='text-2xl font-bold'>Account Page</h1>
      </div>

      <div className='mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-xl font-bold text-text-primary'>Personal information</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="username" className='font-semibold'>Username</label>
            <Input
              icon={faUser}
              placeholder="Enter your username"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <Input
              icon={faEnvelope}
              placeholder="Enter your email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange} onError={errors.email}/>
            {errors.email && <span className='text-danger text-sm'>{errors.email}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="phoneNumber" className='font-semibold'>Phone Number</label>
            <Input
              icon={faPhone}
              placeholder="Enter your phone number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange} />
          </div>
          <button type="submit" className=' text-text-primary border border-gray-200 hover:bg-gray-200 py-2 px-6 rounded-lg hover:opacity-80 transition-opacity'>
            <FontAwesomeIcon icon={faFloppyDisk} className='mr-2' />
            Save Changes
          </button>
        </form>
      </div>

      <div className='mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200'>
        <div className='mb-4 border-b border-gray-200 pb-2'>
          <h2 className='text-xl font-bold text-text-primary'>Change Password</h2>
          <p className='text-sm text-text-secondary mb-4'>Ensure your password is strong and secure.</p>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
           <div className='flex items-center justify-between'>
             <label htmlFor="currentPassword" className='font-semibold'>Current Password</label>
             <button
            type="button"
            tabIndex={-1}
            className="text-gray-400 focus:outline-none hover:text-primary transition-colors"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faEye} className="text-2xl"/>
          </button>
           </div>

            <Input
              icon={showPassword ? faLockOpen : faLock}
              placeholder="Enter your current password"
              type={showPassword ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              onError={errors.currentPassword}
               />

              {errors.currentPassword && <span className='text-danger text-sm'>{errors.currentPassword}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="newPassword" className='font-semibold'>New Password</label>
            <Input
              icon={showPassword ? faLockOpen : faLock}
              placeholder="Enter your new password"
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              onError={errors.newPassword}/>
              {errors.newPassword && <span className='text-danger text-sm'>{errors.newPassword}</span>}
          </div>
            <button type="submit" className=' text-text-primary border border-gray-200 hover:bg-gray-200 py-2 px-6 rounded-lg hover:opacity-80 transition-opacity'>
            <FontAwesomeIcon icon={faFloppyDisk} className='mr-2' />
            Save Changes
          </button>
        </form>
      </div>

      <div className='mb-6 bg-white p-6 rounded-lg shadow-md border border-danger'>
      <div className='mb-4 border-b border-gray-200 pb-2'>
          <h2 className='text-2xl font-bold text-danger'>Warning zone</h2>
          <p className='text-sm text-text-secondary mb-4'>Deleting your account is permanent and cannot be undone.</p>
      </div>
        <div className='flex justify-between '>
          <button type="button" className='bg-danger text-white py-2 px-6 rounded-lg hover:opacity-80 transition-opacity' onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
            Logout
          </button>
          <button type="button" className='bg-danger text-white py-2 px-6 rounded-lg hover:opacity-80 transition-opacity' onClick={handleDeleteUser}>
            <FontAwesomeIcon icon={faTrash} className='mr-2' />
            Delete Account
          </button>
        </div>
      </div>
    </section>
  )
}
