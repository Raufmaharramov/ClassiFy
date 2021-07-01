import React, { Fragment, useContext, useEffect } from "react";
import Axios from "axios";
import Moment from "react-moment";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import Footer from "./Footer";
import TasksModel from "./TasksModel";

const Tasks = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  return (
    <Fragment>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt"></i> Posts
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Posts..." />
                <div className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TasksModel />
      <Footer />
    </Fragment>
  );
};

export default Tasks;
