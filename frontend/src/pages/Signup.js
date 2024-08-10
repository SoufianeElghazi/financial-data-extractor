import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/api';
import icon_signup from '../assets/signup.svg';
import Preload from '../components/Preload';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ email, password });
      setSuccessMessage('Operation succeeded! Redirecting to login...');
      setErrorMessage('');
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error(error); // Handle signup error
      setErrorMessage('Signup failed. Please try again.');
      setSuccessMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center pt-30 justify-center min-h-screen">
      <Preload load={loading} />
      <form onSubmit={handleSubmit} className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 bg-clip-border text-white shadow-lg shadow-green-950/40">
          <div className="w-full md:w-5/12 flex justify-center ">
            <img
              src={icon_signup}
              alt="signup pic"
              className="max-h-20"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Email
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            type="submit"
            className="block w-full select-none rounded-lg bg-gradient-to-tr from-teal-700 to-teal-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-950/20 transition-all hover:shadow-lg hover:shadow-green-950/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Create Account
          </button>
          {successMessage && (
            <div className="mt-4 text-center text-teal-400">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 text-center text-red-500">
              {errorMessage}
            </div>
          )}
          <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Already have an account?
            <a className="ml-1 block font-sans text-sm font-bold leading-normal text-teal-600 antialiased" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
