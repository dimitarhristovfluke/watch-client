import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faBan
} from "@fortawesome/free-solid-svg-icons";

export const getInterval = (nEvery: number, cInterval: string) => {
  switch (cInterval) {
    case "MIN":
      return nEvery + " min" + (nEvery > 1 ? "s" : "");
    case "HRS":
      return nEvery + " hour" + (nEvery > 1 ? "s" : "");
    case "DAYS":
      return nEvery + " day" + (nEvery > 1 ? "s" : "");
    case "MONTH":
      return nEvery + " month" + (nEvery > 1 ? "s" : "");
    default:
      return nEvery + " " + cInterval;
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
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
