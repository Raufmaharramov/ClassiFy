import React, { Fragment } from "react";
import Typed from "react-typed";

const BucketTask = () => {
  return (
    <Fragment>
      <div className="header-wraper">
        <div className="container bucket">
          <div className="col py-2">
            <ul>
              <li>
                <p className="checklist">
                  <i className="fas fa-pencil-alt"></i>Customize Categories
                </p>
              </li>
              <li>
                <p className="checklist">
                  <i className="fas fa-pencil-alt"></i>Search Tasks
                </p>
              </li>
              <li>
                <p className="checklist">
                  <i className="fas fa-pencil-alt"></i>Complete Tasks
                </p>
              </li>
              <li>
                <p className="checklist">
                  <i className="fas fa-pencil-alt"></i>Edit & Delete Tasks
                </p>
              </li>
              <li>
                <p className="checklist">
                  <i className="fas fa-pencil-alt"></i>Track Tasks
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-info">
          <Typed className="typed-text typetext" strings={["Customize Categories", "Complete Tasks", "Search Tasks", "Edit tasks", "Delete Tasks", "Profile Picture", "Email Verification"]} typeSpeed={40} backSpeed={60} loop />
        </div>
      </div>
    </Fragment>
  );
};

export default BucketTask;
