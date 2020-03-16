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

export interface Record<T> extends PageState {
  item: T;
}

export interface List<T> extends PageState {
  items: T[];
}

export const getStatusIcon = (item: EmaintAutoLogType) => {
  return !item.cerrormsg.length ||
    item.cerrormsg.toUpperCase() === "SUCCESS" ? (
    <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg" />
  ) : (
    <FontAwesomeIcon icon={faTimesCircle} color="red" size="lg" />
  );
};
