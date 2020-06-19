import React from "react";
import "./ErrorAlert.css";

type Props = {
  onTryAgain: () => void;
};

const ErrorAlert = ({ onTryAgain }: Props) => (
  <div className="alert" role="alert">
    <p>
      Could not download data.{" "}
      <button onClick={() => onTryAgain()}>Try again</button>
    </p>
  </div>
);

export default ErrorAlert;
