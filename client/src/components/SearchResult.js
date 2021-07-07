import React, { Fragment, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import logo from "../img/pencil.jpg";

const SearchResult = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  async function handleDelete(myId) {
    const config = {
      headers: { Authorization: `Bearer ${appState.user.token}` }
    };
    try {
      await Axios.delete(`/tasks/${myId}`, config);
      appDispatch({ type: "deleteTask", data: myId });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Fragment>
      <h1 className="design my-3 text-warning">Search result for {props.nese.title}</h1>
      <div className="container">
        <img className="hand-logo" src={logo} alt="vdvd" />
        <div className="card text-white bg-warning mb-3 my-5" style={{ maxWidth: "37rem" }}>
          <div className="card-header h5 bg-dark">
            {props.nese.title}
            <div className="icon">
              <Link to={`/tasks/${props.nese._id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-3">
                <i className="fas  fa-edit" style={{ fontSize: "1.2em" }}></i>
              </Link>{" "}
              <Link to="/dashboard" onClick={() => handleDelete(props.nese._id)} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
                <i className="fas fa-trash" style={{ fontSize: "1.2em" }}></i>
              </Link>
            </div>
          </div>
          <div className="card-body">
            <h6 className="card-text text-dark">{props.nese.description}</h6>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResult;
