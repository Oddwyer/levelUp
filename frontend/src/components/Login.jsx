import React from 'react';
import LevelUpLogo from './LevelUpLogo';
import sharedStyles from './SharedStyles';
import PageWrapper from './PageWrapper';


const Login = ({ onForgotPasswordClick, onSignUpClick  }) => {
  return (
    <>
      <style>{sharedStyles}</style>
      <PageWrapper>
          <div className="max-w-md w-full space-y-8 bg-[var(--brand-dark)] bg-opacity-80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700/50">
            <div>
              <div className="flex justify-center">
                <LevelUpLogo />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Welcome to LevelUp
              </h2>
              <p className="mt-2 text-center text-sm text-gray-300">
                Sign in to continue to your dashboard
              </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-600 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)] focus:border-[var(--brand-red)] focus:z-10 sm:text-sm transition-all"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[var(--brand-red)] focus:ring-[var(--brand-pink)] border-gray-500 bg-gray-700 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" onClick={(e) => { e.preventDefault(); onForgotPasswordClick(); }} className="font-medium text-[var(--brand-pink)] hover:text-red-300 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--brand-red)] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--brand-pink)] transition-transform transform hover:scale-105 duration-300"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onSignUpClick(); }} className="font-medium text-[var(--brand-pink)] hover:text-red-300 transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </PageWrapper>
    </>
  );
};

export default Login;