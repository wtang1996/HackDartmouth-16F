import React from 'react';
import { Link } from 'react-router';

// NavBar is dumb component as it has nothing to store in state
const NavBar = () => {
  return (
    <div className="Navbar">
      <Link to="/" className="siteName">Blogger</Link>
      <Link to="posts/new">New</Link>
    </div>
  );
};

export default NavBar;
