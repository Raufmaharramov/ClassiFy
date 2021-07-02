import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import Footer from "./Footer";

const Login = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/users/login", { email, password });
      appDispatch({ type: "login", data: response.data });
    } catch (error) {
      console.log(error.message);
    }
  }

  if (appState.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-user"></i> Task Manager
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h4>Account Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} action="index.html">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="form-control" />
                  </div>
                  <input type="submit" value="Login" className="btn btn-primary btn-block" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
