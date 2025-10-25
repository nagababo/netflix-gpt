import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { USER_AVATAR } from '../utils/constants';
import { addUser, removeUser } from "../utils/userSlice"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErroMessage] = useState(null)
  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null)
  const dispatch = useDispatch()

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)

  }

  const handleButtonClick = () => {
    const msg = checkValidData(email.current.value, password.current.value)
    setErroMessage(msg)
    if (msg) return
    if (!isSignInForm) {

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
         // const user = userCredential.user;
          debugger;
         // const auth = getAuth();

          console.log(auth,"auth")
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
             photoURL: USER_AVATAR
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            debugger;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
          }).catch((error) => {

          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErroMessage(errorCode + "-" + errorMessage)
        });
    } else {
      //signin logic

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErroMessage(errorCode + "-" + errorMessage)
        });
    }

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
        {!isSignInForm && (
          <input ref={name} type="text" placeholder='Full Name' className='p-2 my-2  w-full bg-gray-700 rounded-lg ' />)}
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