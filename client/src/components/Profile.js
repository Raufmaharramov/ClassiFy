/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import Footer from "./Footer";

const Profile = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;

  useEffect(() => {
    async function fetchProfile() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get("users/me", config);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProfile();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function deleteProfile() {
    const config = {
      headers: { Authorization: `Bearer ${appState.user.token}` }
    };
    try {
      await Axios.delete("/users/me", config);
      appDispatch({ type: "logout" });
      props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Fragment>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-user"></i> Edit Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a href="index.html" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To Dashboard
              </a>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-success btn-block">
                <i className="fas fa-lock"></i> Change Password
              </a>
            </div>
            <div className="col-md-3">
              <Link onClick={e => deleteProfile(e)} to="/" className="btn btn-danger btn-block">
                <i className="fas fa-trash"></i> Delete Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4>Edit Profile</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" name="name" onChange={e => onChange(e)} value={name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" name="email" onChange={e => onChange(e)} value={email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" name="password" onChange={e => onChange(e)} value={password} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Your Avatar</h3>
              <img src={appState.user.avatar} alt="" className="d-block img-fluid mb-3" />
              <button className="btn btn-primary btn-block">Edit Image</button>
              <button className="btn btn-danger btn-block">Delete Image</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default withRouter(Profile);
