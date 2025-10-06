import React from "react";
import sharedStyles from './SharedStyles';
import PageWrapper from './PageWrapper';
import LevelUpLogo from './LevelUpLogo';
import { useState } from "react";

const ForgotPassword = ({ onBackToLogin }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{sharedStyles}</style>
      <PageWrapper>
        <div className="max-w-md w-full space-y-8 bg-[var(--brand-dark)] bg-opacity-80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700/50">
          <div className="flex justify-center">
            <LevelUpLogo />
          </div>
          {!submitted ? (
            <>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Forgot Password</h2>
              <p className="mt-2 text-center text-sm text-gray-300">Enter your email to get a reset link.</p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--brand-red)] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--brand-pink)] transition-transform transform hover:scale-105 duration-300"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Check your email</h2>
              <p className="mt-4 text-center text-sm text-gray-300">
                If an account with that email exists, we've sent a link to reset your password.
              </p>
            </div>
          )}
          <div className="text-center">
            <a href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }} className="font-medium text-sm text-[var(--brand-pink)] hover:text-red-300 transition-colors">
              Back to Sign In
            </a>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ForgotPassword;