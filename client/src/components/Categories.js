/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Footer from "./Footer";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const Categories = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchTasks() {
      const config = {
        headers: { Authorization: `Bearer ${appState.user.token}` }
      };
      try {
        const response = await Axios.get("/categories/count", config, { cancelToken: ourRequest.token });
        appDispatch({ type: "showCounts", data: response.data });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTasks();
    return () => ourRequest.cancel();
  }, []);

  return (
    <Fragment>
      <header id="main-header" className="py-2 bg-success text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-folder"></i> Categories
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="categories">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Categories</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>#Tasks</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(appState.categoryTask).map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{key}</td>
                        <td>{appState.categoryTask[key]}</td>
                        <td>
                          <Link to={`/categories/${key}`} className="btn btn-secondary">
                            <i className="fas fa-angle-double-right"></i> Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Categories;
