import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        ExerciseTracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Exercises
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Create Exercises Log
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/user" className="nav-link">
              Create User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
