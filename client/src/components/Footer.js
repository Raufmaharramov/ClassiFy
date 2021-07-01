import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="lead text-center">
                Copyright &copy;
                <span id="year"></span>
                Blogen
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
