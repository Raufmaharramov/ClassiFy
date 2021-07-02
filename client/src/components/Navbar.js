/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Navbar = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const logout = () => {
    appDispatch({ type: "logout" });
    props.history.push("/login");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          {!appState.loggedIn ? (
            <Fragment>
              <Link to="/register" className="navbar-brand">
                Blogen
              </Link>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
            </Fragment>
          ) : (
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item px-2">
                  <Link to="/dashboard" className="nav-link active">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <Link to="/tasks" className="nav-link">
                    Tasks
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <Link to="/categories" className="nav-link">
                    Categories
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <a href="users.html" className="nav-link">
                    Users
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-user"></i> Welcome {appState.user.username}
                  </a>
                  <div className="dropdown-menu">
                    <a href="profile.html" className="dropdown-item">
                      <i className="fas fa-user-circle"></i> Profile
                    </a>
                    <a href="settings.html" className="dropdown-item">
                      <i className="fas fa-cog"></i> Settings
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <Link onClick={logout} to="/login" className="nav-link">
                    <i className="fas fa-user-times"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
