/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import logo from "../img/pencil.jpg";
import Footer from "./Footer";

const CategoryItem = () => {
  const cat = useParams().category;
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get(`/categories/${cat}`, config, { cancelToken: ourRequest.token });
        appDispatch({ type: "tasks", data: response.data });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    return () => ourRequest.cancel();
  }, []);

  async function handleDelete(myId) {
    const config = {
      headers: { Authorization: `Bearer ${appState.user.token}` }
    };
    try {
      await Axios.delete(`/tasks/${myId}`, config);
      appDispatch({ type: "deleteTask", data: myId });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Fragment>
      <img className="logo" src={logo} alt="vdvd" />
      <h1 className="design my-3 text-warning">Tasks for {cat}</h1>
      {appState.tasks.length > 0 ? (
        appState.tasks.map((task, index) => (
          <div key={index} className="card text-white bg-warning mb-3 my-5" style={{ maxWidth: "37rem" }}>
            <div className="card-header h5 bg-dark">
              {task.title}
              <div className="icon">
                <Link to={`/tasks/${task._id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-3">
                  <i className="fas  fa-edit" style={{ fontSize: "1.2em" }}></i>
                </Link>{" "}
                <Link to="#!" onClick={() => handleDelete(task._id)} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
                  <i className="fas fa-trash" style={{ fontSize: "1.2em" }}></i>
                </Link>
              </div>
            </div>
            <div className="card-body">
              <h6 className="card-text text-dark">{task.description}</h6>
            </div>
          </div>
        ))
      ) : (
        <h4 className="design my-3 text-dark">No Tasks Found...</h4>
      )}
      <Footer />
    </Fragment>
  );
};

export default CategoryItem;
