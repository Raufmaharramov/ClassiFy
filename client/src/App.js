/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
// packages
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
// Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import FlashMessages from "./components/FlashMessages";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import Dashboard from "./components/Dashboard";
import Task from "./components/Task";
import Tasks from "./components/Tasks";
import Categories from "./components/Categories";
import CategoryItem from "./components/CategoryItem";

import "./App.css";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("DevAppToken")),
    flashMessage: [],
    user: {
      username: localStorage.getItem("DevAppUser"),
      token: localStorage.getItem("DevAppToken"),
      avatar: localStorage.getItem("DevAppAvatar"),
      id: localStorage.getItem("DevAppId")
    },
    task: null,
    tasks: []
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "id":
        draft.id = action.data;
        return;
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "flashMessage":
        draft.flashMessage.push(action.value);
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "task":
        draft.task = action.data;
        return;
      case "tasks":
        draft.tasks = action.data;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("DevAppUser", state.user.username);
      localStorage.setItem("DevAppToken", state.user.token);
      localStorage.setItem("DevAppAvatar", state.user.avatar);
      localStorage.setItem("DevAppId", state.user.id);
    } else {
      localStorage.removeItem("DevAppAvatar");
      localStorage.removeItem("DevAppToken");
      localStorage.removeItem("DevAppUser");
      localStorage.removeItem("DevAppId");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Fragment>
            <FlashMessages />
            <Navbar />
            <Route exact path="/" component={Register} />
            <section className="container">
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/add-task" component={Task} />
                <Route exact path="/tasks" component={Tasks} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/categories/:category" component={CategoryItem} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
export default App;
