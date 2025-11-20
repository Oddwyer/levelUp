import React from 'react';
import "./Header.css";
import {FaBell, FaCog, FaDoorOpen } from 'react-icons/fa';

export default function Header() {
    return (
        <>
            <header className="header">
                <div className='button-container'>
                    <button className='header-button'>
                        <FaBell className="icon" />
                    </button>
                    <button className='header-button'>
                        <FaCog className="icon" />
                    </button>
                    <button className='header-button'>
                        <FaDoorOpen className='icon'/>
                    </button>
                </div>
                
            </header>
            
            <div className="header-bg-container">
                <div className="header-bg" />

                <div className="header-content">

                    <h1 className="welcome-text">
                    Budget Tracker
                    </h1>


                    <div className="logo">
                         <div className='logo'/>
                    </div>
                </div>
            </div>
        </>
    );
}