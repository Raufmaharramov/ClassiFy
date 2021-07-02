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
  const education = "Education";
  const business = "Business";
  const dayl = "Daily Life";
  const bill = "Bills & Payments";
  const health = "Health & Wellness";

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

  const cat1 = appState.tasks.filter(task => task.category === "Education");
  const cat2 = appState.tasks.filter(task => task.category === "Daily Life");
  const cat3 = appState.tasks.filter(task => task.category === "Business");
  const cat4 = appState.tasks.filter(task => task.category === "Bills & Payments");
  const cat5 = appState.tasks.filter(task => task.category === "Health & Wellness");

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
                      <th>Title</th>
                      <th>#Tasks</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{education}</td>
                      <td>{cat1.length}</td>
                      <td>
                        <Link to={`/categories/${education}`} className="btn btn-secondary">
                          <i className="fas fa-angle-double-right"></i> Details
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Daily Life</td>
                      <td>{cat2.length}</td>
                      <td>
                        <Link to={`/categories/${dayl}`} className="btn btn-secondary">
                          <i className="fas fa-angle-double-right"></i> Details
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Business</td>
                      <td>{cat3.length}</td>
                      <td>
                        <Link to={`/categories/${business}`} className="btn btn-secondary">
                          <i className="fas fa-angle-double-right"></i> Details
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Bills & Payments</td>
                      <td>{cat4.length}</td>
                      <td>
                        <Link to={`/categories/${bill}`} className="btn btn-secondary">
                          <i className="fas fa-angle-double-right"></i> Details
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Health & Wellness</td>
                      <td>{cat5.length}</td>
                      <td>
                        <Link to={`/categories/${health}`} className="btn btn-secondary">
                          <i className="fas fa-angle-double-right"></i> Details
                        </Link>
                      </td>
                    </tr>
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
