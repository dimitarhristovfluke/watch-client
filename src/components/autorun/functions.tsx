import React from "react";
import { EmaintAutoType } from "../../db/definitions";

export const getInterval = (item: EmaintAutoType) => {
  switch (item.cinterval) {
    case "MIN":
      return <span>{item.nevery + " min" + (item.nevery > 1 ? "s" : "")}</span>;
    case "HRS":
      return (
        <span>{item.nevery + " hour" + (item.nevery > 1 ? "s" : "")}</span>
      );
    case "DAYS":
      return <span>{item.nevery + " day" + (item.nevery > 1 ? "s" : "")}</span>;
    case "MONTH":
      return (
        <span>{item.nevery + " month" + (item.nevery > 1 ? "s" : "")}</span>
      );
    default:
      return <span>{item.nevery + " " + item.cinterval}</span>;
  }
};

export const getStatusIcon = (item: EmaintAutoType) => {
  switch (item.status) {
    case "RUNNING":
      return <span className="badge badge-primary">RUNNING</span>;
    case "PENDING":
      return <span className="badge badge-warning">PENDING</span>;
    case "SUCCESS":
      return <span className="badge badge-success">SUCCESS</span>;
    case "ERROR":
      return <span className="badge badge-warning">ERROR</span>;
    case "STALLED":
      return <span className="badge badge-danger">DID NOT RUN</span>;
    case "UNKNOWN":
      return <span className="badge badge-secondary">UNKNOWN</span>;
    default:
      return <span className="badge badge-secondary">UNKNOWN</span>;
  }
};
