import React from "react";
import "./ErrorAlert.css";

const ErrorAlert = () => (
  <div className="alert" role="alert">
    <p>
      Could not download data. <button>Try again</button>
    </p>
  </div>
);

export default ErrorAlert;
