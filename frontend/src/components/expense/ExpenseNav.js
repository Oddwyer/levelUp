// Imports React & Material UI
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
//import { useNavigate } from 'react-router-dom';


// Import Logo
import logo from '../../assets/levelUp-logo.png';

// Import css File
import './ExpenseNav.css';

const pages = ['Expense', 'Budget', 'Dashboard',];

// Expense NavBar Component Function
export default function ExpenseNav() {

  /* Nav Bar Functionality
  const navigate = useNavigate();

  function handlePage() {
    if (key === "Dashboard") {
      navigate('/dashboard');
    }
    else if (key === "Expense") {
      navigate('/expense');
    }
    else if (key === "Budget") {
      navigate('/budget');
    }
  };*/


  // Logout Functionality
  async function handleLogout() {
    try {
      await fetch('/logout', { method: 'POST', credentials: 'include' });
    } catch (_) {
    } finally {
      window.location.replace('/login');
    }
  }

  // NavBar Display
  return (
    // AppBar is the top-level navigation bar container
    <AppBar position="static" className="expense-nav" sx={{ backgroundColor: '#a41727'}}>
      {/* Container keeps the content aligned and sets max width */}
      <Container maxWidth="xl">
        {/* Toolbar horizontally aligns items inside the AppBar */}
        <Toolbar disableGutters className="expense-nav-inner">

          {/** -------------------------------------------------------------- */}
          {/**  LEFT SIDE — LOGO (DESKTOP ONLY)                              */}
          {/** -------------------------------------------------------------- */}

          {/* Point to logo image path */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img
              src={logo}
              alt="LevelUp logo"
              className="levelUp-logo"  // style this in ExpenseNav.css
            />
          </Box>

          {/* "LOGO" text visible only on medium and larger screens */}
          <Typography
            noWrap
            ="a"
            //href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' }, // hidden on mobile, shown on desktop
            }}
          >
            <span className="levelUp-brand-text">LevelUp</span>
            <span className="levelUp-brand-arrow" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#ffffff"
              >
                <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
              </svg>
            </span>
          </Typography>


          {/** -------------------------------------------------------------- */}
          {/**  DESKTOP NAVIGATION BUTTONS                                   */}
          {/** -------------------------------------------------------------- */}

          {/* Desktop nav menu - shown only on md+ screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' , justifyContent: 'center'} }}>

            {/* Loop through pages and create a button for each */}
            {pages.map((page) => (
              <Button className="expense-links" aria-label="Primary Navigation" 
                key={page}
                //onClick={() => handlePage(page)}
                sx={{ my: 2, color: 'white', margin: .5, fontWeight: 'bold', '&:hover':{textDecoration: 'underline'} }} // style for desktop
              >
                {page}
              </Button>
            ))}
          </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'anchor-center' }}>
            <div className="expense-logout">
          <button className="btn btn--outline" href="#!" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </Box>

    </Toolbar>
      </Container >
    </AppBar >
  );
}
