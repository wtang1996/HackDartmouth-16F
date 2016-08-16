import React from 'react';
import { Link } from 'react-router';

// NavBar is dumb component as it has nothing to store in state
const NavBar = () => {
  return (
    <div className="Navbar">
      <Link to="/" className="siteName">DigUp</Link>
      <Link to="posts/new">New lost or found Item</Link>
    </div>
  );
};

export default NavBar;
