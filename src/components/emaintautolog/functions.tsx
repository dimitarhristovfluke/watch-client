import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { EmaintAutoLogType } from "../../db/definitions";

interface PageState {
  error: any;
  isLoaded: boolean;
}

export const getStatusIcon = (item: EmaintAutoLogType) => {
  return !item.cerrormsg.length ||
    item.cerrormsg.toUpperCase() === "SUCCESS" ? (
    <span className="badge badge-success">SUCCESS</span>
  ) : (
    <span className="badge badge-danger">ERROR</span>
  );
};
