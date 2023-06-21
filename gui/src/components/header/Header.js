import React, {useRef} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import "./header.css";


const Header = () => {
	const navRef = useRef();
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

	const showNavbar = () => {          //Μέθοδος που εμφανίζει/αποκρύπτει τα στοιχεία του Header
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  const signOut = async (e) => {      //Μέθοδος για την αποσύνδεση του χρήστη
    e.preventDefault();
    await logout();
    navigate('/');
  };

  
	return (
		<header>
			<h3>Euro</h3>
      <nav ref={navRef}>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/read">Read</Link>
        <Link to="/update">Update</Link>
         <Link to="/delete">Delete</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
        <div className="right-links">
          {auth?.username ? (
            <Button
              variant="contained"
              color="error"
              style={{fontWeight: 'bold', position:'absolute', right: '3rem', fontSize: '1rem'}}
              onClick={(e) => signOut(e)}
              >LogOut
            </Button>
          ) : (
            <>
              <Button 
                variant="contained"
                color="warning"
                style={{position:'absolute', right: '9rem', fontWeight: 'bold', fontSize: '1.2rem'}}
                onClick={(e) => {e.preventDefault(); navigate('/signup');}}
              >Sign Up
              </Button>
              <Button
                variant="contained"
                color="warning"
                style={{position:'absolute', right: '1rem', fontWeight: 'bold', fontSize: '1.2rem'}}
                onClick={(e) => {e.preventDefault(); navigate('/login');}}
              >Log In
              </Button>
            </>
          )}
        </div>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Header;