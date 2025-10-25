import React, { useEffect } from 'react'
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGO_URL } from "../utils/constants"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice"



const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((store) => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // dispatch(removeUser())
      //navigate("/")

    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        const { uid, email, displayName } = user
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        navigate("/browse")

      } else {
        dispatch(removeUser())
        navigate("/")
      }
    });

    return () => unSubscribe()

  }, [])
  return (
    <>
      <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 flex justify-between'>
        <img alt='logo'
          className='w-44'
          src={LOGO_URL}
        />
        {user &&

          <div className='py-2'>
            <button className='p-y-2  text-white' onClick={handleSignOut}>Sign Out</button>
          </div>
        }
      </div>


    </>
  )
}

export default Header