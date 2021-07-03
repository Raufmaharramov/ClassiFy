/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import Moment from "react-moment";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const CompletedTasks = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    async function getCompletedTasks() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get("/completed", config);
        appDispatch({ type: "completed", data: response.data });
      } catch (error) {
        console.log(error.message);
      }
    }
    getCompletedTasks();
  }, []);

  return (
    <Fragment>
      <section id="posts" className="py-2 bg-light text-black">
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
                      <th>Completed Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  {appState.completed.length > 0 ? (
                    appState.completed.slice(0, 6).map((task, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.category}</td>
                            <td>
                              <Moment format="MM/DD/YYYY">{task.updatedAt}</Moment>
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

export default CompletedTasks;
