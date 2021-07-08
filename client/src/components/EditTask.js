/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { withRouter } from "react-router";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const EditTask = props => {
  const id = useParams().id;
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });

  const { title, description, category } = formData;

  useEffect(() => {
    async function fetchTask() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get(`/tasks/${id}`, config);
        setFormData({
          title: response.data.title,
          category: response.data.category,
          description: response.data.description
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTask();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${appState.user.token}` }
    };
    try {
      const response = await Axios.patch(`/tasks/${id}`, formData, config);
      appDispatch({ type: "task", data: response.data });
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Fragment>
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
          <label htmlFor="title">Description</label>
          <input name="description" onChange={e => onChange(e)} value={description} type="text" className="form-control" />
        </div>
        <input type="submit" value="Save Changes" className="btn btn-primary my-1" />
      </form>
    </Fragment>
  );
};

export default withRouter(EditTask);
