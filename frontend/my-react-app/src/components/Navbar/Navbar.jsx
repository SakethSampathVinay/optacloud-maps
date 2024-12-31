import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>GroceryStore</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/address">Address Form</Link>
        </li>
        <li>
          <Link to="/addressmanagement">Address Management</Link>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="navbar-actions">
        <input
          type="text"
          placeholder="Search for products..."
          className="navbar-search"
        />
        <button className="navbar-cart">
          <img
            src="https://img.icons8.com/ios-glyphs/30/shopping-cart.png"
            alt="cart"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
