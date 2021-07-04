/* eslint-disable jsx-a11y/alt-text */
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
    props.history.push("/");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
        <div className="container">
          {!appState.loggedIn ? (
            <Fragment>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link to="/" className="navbar-brand">
                BucketTask
              </Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item ">
                    <Link to="/login" className="nav-link">
                      <i className="fas fa-user"></i> Sign In
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/register" className="nav-link">
                      <i className="fas fa-user"></i> Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link to="/dashboard" className="navbar-brand">
                BucketTask
              </Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
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
                    <Link to="/completed" className="nav-link">
                      Completed
                    </Link>
                  </li>
                  <li className="nav-item dropdown mr-3">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                      {!appState.user.avatar ? <img className="small-header-avatar" src="../img/avatar.png" /> : <img className="small-header-avatar" src={appState.user.avatar} />} {appState.user.username}
                    </a>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">
                        <i className="fas fa-user-circle"></i> Profile
                      </Link>
                      <a href="#!" className="dropdown-item">
                        <i className="fas fa-cog"></i> Settings
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link onClick={logout} to="/" className="nav-link">
                      <i className="fas fa-user-times"></i> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </Fragment>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
