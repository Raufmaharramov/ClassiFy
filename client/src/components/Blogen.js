import React from "react";
import Typed from "react-typed";

const Blogen = () => {
  return (
    <div className="header-wraper">
      <div className="main-info">
        <h1>Tasks that make your life more organized.</h1>
        <Typed className="typed-text" strings={["Web Design", "Web Development", "Facebook Ads SMM", "Google Ads"]} typeSpeed={40} backSpeed={60} loop />
      </div>
    </div>
  );
};

export default Blogen;
