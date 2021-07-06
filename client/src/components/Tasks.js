import React, { Fragment, useContext, useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router";
import TasksModel from "./TasksModel";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import SearchResult from "./SearchResult";

const Tasks = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [inp, setInp] = useState("");
  const [nese, setNese] = useState();

  async function search() {
    const config = {
      headers: { Authorization: `Bearer ${appState.user.token}` }
    };

    try {
      const response = await Axios.get(`/search/${inp}`, config);
      setNese(response.data);
    } catch (error) {
      appDispatch({ type: "flashMessage", value: "No task found" });
      props.history.push("/categories");
      console.log(error.message);
    }
  }

  return (
    <Fragment>
      <header id="main-header" className="py-3 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt"></i> Tasks
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="search" className="py-3 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input value={inp} onChange={e => setInp(e.target.value)} type="text" className="form-control" placeholder="Search Posts..." />
                <div className="input-group-append">
                  <button onClick={search} className="btn btn-primary">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!nese ? <TasksModel /> : <SearchResult nese={nese} />}
    </Fragment>
  );
};

export default withRouter(Tasks);
