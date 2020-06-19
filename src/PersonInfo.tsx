import React from "react";
import cn from "classnames";
import { Datum } from "./types";

type Props = {
  data: Datum;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

function PersonInfo(props: Props) {
  const { data, isSelected, onSelect } = props;
  return (
    <li
      onClick={() => onSelect(data.id)}
      role="button"
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
      className={cn("person-info", isSelected && "selected")}
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
