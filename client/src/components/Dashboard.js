import React, { Fragment, useContext } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import StateContext from "../StateContext";
import TasksModel from "./TasksModel";

const Dashboard = () => {
  const appState = useContext(StateContext);

  return (
    <Fragment>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-cog"></i> Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/add-task" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                <i className="fas fa-plus"></i> Add Task
              </Link>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                <i className="fas fa-plus"></i> Add Category
              </a>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-warning btn-block" data-toggle="modal" data-target="#addUserModal">
                <i className="fas fa-plus"></i> Add User
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="posts">
        <div className="container">
          <div className="row">
            <TasksModel />
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Tasks</h3>
                  <h4 className="display-4">
                    <i className="fas fa-pencil-alt"></i> 6
                  </h4>
                  <Link to="/tasks" className="btn btn-outline-light btn-sm">
                    View
                  </Link>
                </div>
              </div>

              <div className="card text-center bg-success text-white mb-3">
                <div className="card-body">
                  <h3>Categories</h3>
                  <h4 className="display-4">
                    <i className="fas fa-folder"></i> 4
                  </h4>
                  <Link to="/categories" className="btn btn-outline-light btn-sm">
                    View
                  </Link>
                </div>
              </div>

              <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display-4">
                    <i className="fas fa-users"></i> 4
                  </h4>
                  <a href="users.html" className="btn btn-outline-light btn-sm">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
