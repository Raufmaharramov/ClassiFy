import React, { useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import Dashboard from "./Dashboard";

const CategoryItem = props => {
  const cat = useParams().cat;
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  // const { category, owner, title, createdAt, description } = props.task;

  useEffect(() => {
    async function fetchCategory() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get(`/tasks/${cat}`, config);
        appDispatch({ type: "tasks", data: response.data });
      } catch (error) {}
    }
    fetchCategory();
  }, []);

  return (
    <section id="posts">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h4>Latest Posts</h4>
              </div>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                {appState.tasks.length > 0 ? (
                  appState.tasks.slice(0, 6).map((task, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{task.title}</td>
                          <td>
                            <Moment format="MM/DD/YYYY">{task.createdAt}</Moment>
                          </td>
                          <td>
                            <a href="details.html" className="btn btn-secondary">
                              <i className="fas fa-angle-double-right"></i> Details
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <tbody>
                    <tr>
                      <td>No Tasks found...</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryItem;
