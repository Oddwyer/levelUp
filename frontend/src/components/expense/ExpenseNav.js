// Imports React & Material UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//import { useNavigate } from 'react-router-dom';


// Import Logo
import logo from '../../assets/levelUp-logo.png';

// Import css File
import './ExpenseNav.css';

// Website Pages
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


  // Function - Logout
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
    // Top-level navigation bar container
    <AppBar className="expense-nav" position="static" sx={{ backgroundColor: '#a41727' }}>
      {/* Toolbar - horizontally aligns items inside the AppBar */}
      <Toolbar className="expense-nav-inner" disableGutters>

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
          <Typography className="levelUp-brand-text">
            LevelUp
          </Typography>
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

        {/* Desktop nav menu - shown only on md+ screens */}
        <Box className='expense-links' aria-label='Primary Navigation' sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          {/* Loop through pages and create a button for each */}
          {pages.map((page) => (
            <Button sx={{ padding: 5, my: 2, color: 'white', margin: .5, fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}
              key={page}
            //onClick={() => handlePage(page)}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/** -------------------------------------------------------------- */}
        {/**  RIGHT LOG-OUT BUTTON                                          */}
        {/** -------------------------------------------------------------- */}

        <Box className='expense-logout' sx={{
          display: 'flex', justifyContent: 'flex-end', marginleft: 'auto',
          alignItems: 'center'
        }}>
          <button className="btn btn--outline" href="#!" onClick={handleLogout}>
            Log Out
          </button>
        </Box>
      </Toolbar>
    </AppBar >
  );
}
