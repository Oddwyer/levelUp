import { useState } from "react";
import sharedStyles from './SharedStyles';
import PageWrapper from './PageWrapper';

// This is meant to be replaced with the actual dashboard later
const Dashboard = ({ onLogout }) => (
  <PageWrapper>
    <div className="max-w-md w-full space-y-8 bg-[var(--brand-dark)] bg-opacity-80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700/50 text-white">
      <h2 className="text-center text-3xl font-extrabold">Welcome!</h2>
      <p className="text-center">You have successfully logged in.</p>
      <button
        onClick={onLogout}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--brand-red)] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--brand-pink)] transition-transform transform hover:scale-105 duration-300"
      >
        Logout
      </button>
    </div>
  </PageWrapper>
);

export default Dashboard;