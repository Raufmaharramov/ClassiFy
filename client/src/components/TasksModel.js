/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import Moment from "react-moment";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const TasksModel = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchTasks() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get("/tasks", config, { cancelToken: ourRequest.token });
        appDispatch({ type: "tasks", data: response.data });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTasks();
    return () => ourRequest.cancel();
  }, []);

  return (
    <Fragment>
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
                            <td>{task.category}</td>
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
                <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a href="#" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TasksModel;
