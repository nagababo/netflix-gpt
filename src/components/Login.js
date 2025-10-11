import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErroMessage] = useState(null)
  const email = useRef(null);
  const password = useRef(null)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)

  }

  const handleButtonClick = () => {
    const msg = checkValidData(email.current.value, password.current.value)
    setErroMessage(msg)
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img alt='logo'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/25f808aa-cecb-4753-8541-9a79f40c18ae/web/IN-en-20251006-TRIFECTA-perspective_507f47be-8780-4697-92cb-0f6c78177b6e_large.jpg" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-2xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input type="text" placeholder='Full Name' className='p-2 my-2  w-full bg-gray-700 rounded-lg ' />)}
        <input ref={email} type="text" placeholder='Email Address' className='p-2 my-2  w-full bg-gray-700 rounded-lg ' />
        <input ref={password} type="password" placeholder='Password' className='p-2 my-2 w-full bg-gray-700 rounded-lg' />
        <p className='text-red-500'> {errorMessage}</p>
        <button className='bg-red-700 w-full p-4 my-4 rounded-lg cursor-pointer' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? SignUp Now" : "Already a user, sign in now"}</p>
      </form>
    </div>
  )
}

export default Login