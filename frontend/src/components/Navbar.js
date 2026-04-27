import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Ghosts of SRM <span>· Management App</span>
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/add">Add Member</NavLink>
        </li>
        <li>
          <NavLink to="/view">View Members</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
