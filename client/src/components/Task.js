import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Task = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });

  const { title, description, category } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${appState.user.token}` }
    };
    try {
      const response = await Axios.post("/tasks", formData, config);
      appDispatch({ type: "task", data: response.data });
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Add Post</h1>
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
          </div>
        </div>
      </section>

      <section id="details">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Add Post</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input name="title" onChange={e => onChange(e)} value={title} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select name="category" onChange={e => onChange(e)} value={category} className="form-control">
                        <option value="0">Select Matching Category</option>
                        <option value="Education">Education</option>
                        <option value="Daily Life">Daily Life</option>
                        <option value="Business">Business</option>
                        <option value="Bills & Payments">Bills & Payments</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="body">Description</label>
                      <textarea name="description" onChange={e => onChange(e)} value={description} className="form-control"></textarea>
                    </div>
                    <input type="submit" value="Submit Task" className="btn btn-primary btn-block" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default withRouter(Task);
