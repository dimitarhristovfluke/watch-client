import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCheckCircle,
  faBan,
  faTimesCircle,
  faQuestionCircle,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

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

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "RUNNING":
      return <FontAwesomeIcon icon={faCog} spin size="lg" color="blue" />;
      break;
    case "PENDING":
      return (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          color=" #FFBF00"
          title="Pending"
          size="lg"
        />
      );
      break;
    case "SUCCESS":
      return <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg" />;
      break;
    case "ERROR":
      return <FontAwesomeIcon icon={faTimesCircle} color="red" size="lg" />;
      break;
    case "STALLED":
      return <FontAwesomeIcon icon={faBan} color="red" size="lg" />;
      break;
    case "UNKNOWN":
      return <FontAwesomeIcon icon={faQuestionCircle} color="grey" size="lg" />;
      break;
    default:
      return <FontAwesomeIcon icon={faQuestionCircle} size="lg" />;
      break;
  }
};
