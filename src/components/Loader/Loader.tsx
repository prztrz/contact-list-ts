import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader" aria-busy="true">
    {Array(8).fill(<div />)}
  </div>
);

export default Loader;
