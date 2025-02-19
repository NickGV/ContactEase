import { useNavigate } from 'react-router-dom'
import illustration from '../assets/illustration.png'

export const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="absolute -top-64 -left-32 w-[834px] h-[824px] bg-[#d3d3d3] rounded-full -z-10"></div>

      <div className="w-96 text-black p-6 bg-[#d3d3d3] rounded-lg">
        <h1 className="font-bold text-7xl mb-10 text-center">Login</h1>
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input type="email" id="email" name="email" className="p-2 text-lg rounded-lg" placeholder="jonh@gmail.com"/>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <input type="password" id="password" name="password" className="p-2 rounded-lg text-lg" placeholder="password"/>
          </div>
          <button type="submit" className="w-full p-2 bg-[#030303] text-white font-bold rounded-xl transition-colors duration-300 hover:bg-[#505050]">Login</button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <button onClick={() => navigate('/register')} className="w-full p-2 bg-[#030303] text-white font-bold rounded-xl transition-colors duration-300 hover:bg-[#505050]">Register</button>
      </div>
      <div className="absolute bottom-8 right-32">
        <img src={illustration} alt="Illustration" className='w-64 rounded-full shadow-illustration'/>
      </div>
    </section>
  )
}
