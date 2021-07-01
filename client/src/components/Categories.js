import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Moment from "react-moment";
import StateContext from "../StateContext";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  const appState = useContext(StateContext);
  const cat1 = appState.tasks.filter(task => task.category === "Education");
  const cat2 = appState.tasks.filter(task => task.category === "Daily Life");
  const cat3 = appState.tasks.filter(task => task.category === "Business");
  const cat4 = appState.tasks.filter(task => task.category === "Bills & Payments");
  const cat5 = appState.tasks.filter(task => task.category === "Health & Wellness");

  // const [edu, setEdu] = useState(cat1)
  // const [dayl, setDayl] = useState(cat2)
  // const [buss, setBuss] = useState(cat3)
  // const [bills, setBills] = useState(cat4)
  // const [heal, setHeal] = useState(cat5)

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
                      <th>Date</th>
                      <th>#Tasks</th>
                      <th></th>
                    </tr>
                  </thead>
                  {appState.tasks.map((task, index) => (
                    <Fragment>
                      <tbody key={index}>
                        <tr>
                          <td>1</td>
                          <td>{task.category}</td>
                          <td>
                            <Moment format="MM/DD/YYYY">{task.createdAt}</Moment>
                          </td>
                          <td>
                            <Link to={`/categories/${task.category}`} className="btn btn-secondary">
                              <i className="fas fa-angle-double-right"></i> Details
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </Fragment>
                  ))}
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
