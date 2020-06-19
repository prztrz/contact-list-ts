import React from "react";
import { Datum } from "./types";

type Props = {
  data: Datum;
};

function PersonInfo(props: Props) {
  const { data } = props;
  return (
    <li
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: "#fff",
        cursor: "pointer"
      }}
      className="person-info"
    >
      <header>
        <h2 className="firstNameLastName">{data.firstNameLastName}</h2>
      </header>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </li>
  );
}

export default PersonInfo;
