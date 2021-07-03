/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import TasksModel from "./TasksModel";
import StateContext from "../StateContext";

const Dashboard = () => {
  const appState = useContext(StateContext);
  return (
    <Fragment>
      <section id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>
                <i className="fas fa-cog"></i> Dashboard
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/add-task" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                <i className="fas fa-plus"></i> Add Task
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/completed" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                <i className="fas fa-user-check"></i> Completed Tasks
              </Link>
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
        <TasksModel />
        <div className="container">
          <div className="col">
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Tasks</h3>
                  <h4 className="display-4">
                    <i className="fas fa-pencil-alt"></i> {appState.tasks.length}
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
