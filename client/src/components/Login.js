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
      <header id="main-header" class="py-2 bg-primary text-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>
                <i class="fas fa-user"></i> Task Manager
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" class="py-4 mb-4 bg-light">
        <div class="container">
          <div class="row"></div>
        </div>
      </section>

      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="card">
              <div class="card-header">
                <h4>Account Login</h4>
              </div>
              <div class="card-body">
                <form onSubmit={handleSubmit} action="index.html">
                  <div class="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" class="form-control" />
                  </div>
                  <input type="submit" value="Login" class="btn btn-primary btn-block" />
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
