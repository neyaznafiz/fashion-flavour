import React from 'react';
import auth from '../../../../Firebase/firebase.init'
import { useSignInWithFacebook, useSignInWithGoogle, useSignInWithTwitter } from 'react-firebase-hooks/auth';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SocialLogin = () => {


  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth)

  const [signInWithFacebook, facebookUser, FacebookLoading, FacebookError] = useSignInWithFacebook(auth);

  const navigate = useNavigate()
  const location = useLocation()
  let from = location.state?.from?.pathname || "/";

  if (googleError || FacebookError) {

    toast.error(<>{googleError?.message}, {FacebookError?.message}</>)
  }

  if (googleLoading || FacebookLoading) {
    return <Loading></Loading>
  }

  if (googleUser || facebookUser) {
    navigate(from, { replace: true });

    toast.success('Congratulation ! You are Loged In successfully. Enjoy our more feature here.')
  }


  return (
    <div>
      <div className=' py-6 px-4 flex justify-between items-center social-shadow'>

        <div className='text-gray-300 hover:text-gray-800'>
          <button onClick={() => signInWithGoogle()} className='text-4xl'> <AiFillGoogleCircle className=''></AiFillGoogleCircle></button>
        </div>

        <h2 className='font-semibold'>YOU CAN GO WITH SOCIAL ACCOUNT</h2>

        <div className='text-gray-300 hover:text-gray-800'>
          <button onClick={() => signInWithFacebook()} className='text-3xl '> <BsFacebook className=''></BsFacebook></button>
        </div>

      </div>

      <ToastContainer />
    </div>
  );
};

export default SocialLogin;