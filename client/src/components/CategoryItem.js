/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

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
      {appState.tasks.length > 0 ? (
        appState.tasks.map((task, index) => (
          <div key={index} className="card text-white bg-info mb-3" style={{ maxWidth: "50rem" }}>
            <div className="card-header">
              Have you completed your task?{" "}
              <span>
                {" "}
                <Link to={`/tasks/${task._id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
                  <i className="fas fa-edit"></i>
                </Link>
              </span>
              <span>
                {" "}
                <Link to="#!" onClick={() => handleDelete(task._id)} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
                  <i className="fas fa-trash"></i>
                </Link>
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
            </div>
          </div>
        ))
      ) : (
        <h4>No Tasks Found...</h4>
      )}
    </Fragment>
  );
};

export default CategoryItem;
