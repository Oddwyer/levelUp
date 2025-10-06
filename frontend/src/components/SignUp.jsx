import React from "react";
import PageWrapper from "./PageWrapper";
import sharedStyles from "./SharedStyles";
import LevelUpLogo from "./LevelUpLogo";
import { useState } from "react";

const SignUp = ({ onBackToLogin }) => {
  return (
    <>
      <style>{sharedStyles}</style>
      <PageWrapper>
        <div className="max-w-md w-full space-y-8 bg-[var(--brand-dark)] bg-opacity-80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700/50">
          <div>
            <div className="flex justify-center">
              <LevelUpLogo />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-300">Join LevelUp to start your journey</p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex space-x-2">
                <input name="first-name" type="text" required className="appearance-none rounded-t-md relative block w-1/2 px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all" placeholder="First Name" />
                <input name="last-name" type="text" required className="appearance-none rounded-t-md relative block w-1/2 px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all" placeholder="Last Name" />
              </div>
               <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all" placeholder="Email address" />
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all" placeholder="Password" />
              <input id="confirm-password" name="confirm-password" type="password" required className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all" placeholder="Confirm Password" />
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--brand-red)] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--brand-pink)] transition-transform transform hover:scale-105 duration-300">
                Sign up
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-300">
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }} className="font-medium text-[var(--brand-pink)] hover:text-red-300 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default SignUp;