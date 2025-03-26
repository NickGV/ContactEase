import { useNavigate } from 'react-router-dom'
import illustration from '../assets/illustration.png'
import useAuth from '../hooks/useAuth'
import useFormValidation from '../hooks/useForm'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { handleRegister } = useAuth()

  const INITIAL_STATE = {
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.username) {
      errors.username = 'The username is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'The email is not valid'
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  }

  const handleSubmitForm = async (formData) => {
    try {
      const response = await handleRegister(formData.username, formData.email, formData.phoneNumber, formData.password)
      if (response.token) {
        navigate('/contacts')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { formData, errors, handleChange, handleSubmit } = useFormValidation(
    INITIAL_STATE,
    validateForm,
    handleSubmitForm
  )

  return (
    <section className="flex flex-col md:flex-row items-center justify-center h-screen px-4 md:px-0">
      <div className="absolute -top-16 -left-16 md:-top-64 md:-left-32 w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[834px] lg:h-[824px] bg-[#d3d3d3] rounded-full -z-10"></div>

      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg text-black p-6 bg-[#d3d3d3] rounded-lg shadow-lg">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl mb-6 md:mb-10 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username" className="text-sm font-semibold">Username</label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              className={`p-2 text-lg rounded-lg ${errors.username ? 'border border-red-500' : ''}`}
              placeholder="John Doe"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className={`p-2 text-lg rounded-lg ${errors.email ? 'border border-red-500' : ''}`}
              placeholder="john@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="phoneNumber" className="text-sm font-semibold">Phone Number</label>
            <input
              onChange={handleChange}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              className={`p-2 text-lg rounded-lg ${errors.phoneNumber ? 'border border-red-500' : ''}`}
              placeholder="123 456 7890"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className={`p-2 rounded-lg text-lg ${errors.password ? 'border border-red-500' : ''}`}
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="w-full p-2 bg-[#030303] text-white font-bold rounded-xl transition-colors duration-300 hover:bg-[#505050]">Register</button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <button onClick={() => navigate('/login')} className="w-full p-2 bg-[#030303] text-white font-bold rounded-xl transition-colors duration-300 hover:bg-[#505050]">Login</button>
      </div>
      <div className="hidden md:block absolute bottom-8 right-32">
        <img src={illustration} alt="Illustration" className="w-64 rounded-full shadow-illustration" />
      </div>
    </section>
  )
}
