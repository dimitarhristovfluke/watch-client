import React from "react";
import * as R from "ramda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimesCircle,
  faCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ProcessInfo } from "../../common/types";

export const cardIcon = (item: ProcessInfo) => {
  if (item.stalled > 0) return faTimesCircle;
  if (!!item.errors && item.errors > 0) return faExclamationTriangle;
  return faCheckCircle;
};

export const procmonCardIcon = (items: ProcessInfo[]) => {
  if (R.find((i) => i.stalled > 0, items)) return faTimesCircle;
  if (R.find((i) => i.errors > 0, items)) return faExclamationTriangle;
  return faCheckCircle;
};

export const cardColor = (item: ProcessInfo) => {
  if (item.stalled > 0) return "#c80000";
  if (!!item.errors && item.errors > 0) return "#dcca00";
  return "#00c800";
};

export const procmonCardColor = (items: ProcessInfo[]) => {
  if (R.find((i) => i.stalled > 0, items)) return "#c80000";
  if (R.find((i) => i.errors > 0, items)) return "#dcca00";
  return "#00c800";
};

export const cardBorderColor = (item: ProcessInfo) => {
  if (item.stalled > 0) return "danger";
  if (!!item.errors && item.errors > 0) return "warning";
  return "success";
};

export const healthStatus = (item: ProcessInfo) => {
  if (item.stalled > 0)
    return <span style={{ color: "red" }}>Interrupted</span>;
  if (item.errors > 0 && item.success === 0)
    return <span style={{ color: "salmon" }}>Bad</span>;
  if (item.errors > 0)
      return <span style={{ color: "orange" }}>Good</span>;
  return <span style={{ color: "green" }}>Excellent</span>;
};

export const procmonHealthStatus = (item: ProcessInfo) => {
  if (item.stalled > 0)
    return <span style={{ color: "red", fontWeight: "bold" }}>OFF</span>;
  return <span style={{ color: "green", fontWeight: "bold" }}>ON</span>;
};

export const procmonOveralHalthStatus = (items: ProcessInfo[]) => {
  if (R.find((i) => i.stalled > 0, items))
    return <span style={{ color: "red" }}>Interrupted</span>;
  if (R.find((i) => i.errors > 0 && i.success === 0, items))
    return <span style={{ color: "salmon" }}>Bad</span>;
  if (R.find((i) => i.errors > 0, items))
    return <span style={{ color: "orange" }}>Good</span>;

  return <span style={{ color: "green" }}>Excellent</span>;
};

export const stalledText = (item: ProcessInfo, url: string) => {
  return (
    <React.Fragment>
      <Link to={url}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="minWidth40"
          color={item.stalled > 0 ? "red" : "lightgrey"}
        />{" "}
        {item.stalled}
      </Link>{" "}
      {item.stalled === 1
        ? " stalled item detected"
        : " stalled items detected"}
    </React.Fragment>
  );
};

export const errorsText = (item: ProcessInfo, url: string) => {
  return (
    <React.Fragment>
      <Link to={url}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          color={item.errors > 0 ? "SandyBrown" : "lightgrey"}
          className="minWidth40"
        />{" "}
        {item.errors}
      </Link>{" "}
      {item.errors === 1 ? "item have failed" : "items have failed"}
    </React.Fragment>
  );
};

export const completedText = (item: ProcessInfo, url: string) => {
  const completed = item.success || 0;
  return (
    <React.Fragment>
      <Link to={url}>
        <FontAwesomeIcon
          icon={faCheck}
          color={completed > 0 ? "green" : "lightgrey"}
          className="minWidth40"
        />{" "}
        {completed}
      </Link>{" "}
      {completed === 1 ? "item completed" : "items completed"}
    </React.Fragment>
  );
};
