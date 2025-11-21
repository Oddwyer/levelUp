// Imports React & Material UI
import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// Import Logo
import logo from '../../assets/levelUp-logo.png';

// Import css File
import './ExpenseNav.css';

// Website Pages
const pages = ['Expense', 'Budget', 'Dashboard',];

// Expense NavBar Component Function
export default function ExpenseNav() {

  /* Nav Bar Functionality ---> Johny + Alex Make Operational
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


  // Function - Logout
  async function handleLogout() {
    try {
      await fetch('/logout', { method: 'POST', credentials: 'include' });
    } catch (_) {
    } finally {
      window.location.replace('/login');
    }
  }

  // Top Navigation Bar Display
  return (
    // Top-level navigation bar container
    <AppBar className="expense-nav">
      {/* Toolbar - Content Layout Helper in AppBar */}
      <Toolbar className="expense-nav-inner">

        {/** -------------------------------------------------------------- */}
        {/**  LEFT SIDE — LOGO + LEVELUP NAME + ARRO                        */}
        {/** -------------------------------------------------------------- */}

        {/* Point to logo image path */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
          <img
            src={logo}
            alt="LevelUp logo"
            className="levelUp-logo"
          />
          {/* LevelUp Text */}
          <Typography className="levelUp-brand-text">
            LevelUp
          </Typography>

          {/* LevelUp Arrow (Google Icons) */}
          <Typography className="levelUp-brand-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#ffffff"
            >
              <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
            </svg>
          </Typography>
        </Box>

        {/** -------------------------------------------------------------- */}
        {/**  CENTER NAVIGATION LINKS                                       */}
        {/** -------------------------------------------------------------- */}

        <Box className='expense-links' aria-label='Primary Navigation'>
          {/* Loop through pages and create a button for each */}
          {pages.map((page) => (
            <Button className='expense-links-text'
              key={page}
            //onClick={() => handlePage(page)} -----> Johny + Alex Make Operational
            >
              {page}
            </Button>
          ))}
        </Box>

        {/** -------------------------------------------------------------- */}
        {/**  RIGHT LOG-OUT BUTTON                                          */}
        {/** -------------------------------------------------------------- */}

        <Box className='expense-logout'>
          <Button className="logout-btn logout-btn-outline" href="#!" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar >
  );
}
