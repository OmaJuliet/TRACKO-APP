'use client'
import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    router.push('/');
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-8 text-semibold text-2xl">Tracko Project Management App</h1>
        <button
          onClick={googleSignIn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </section>
    </>
  );
};

export default Login;
