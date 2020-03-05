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

import { isFiveMinAgo, NOW } from "../../common/functions";
import { AsyncType, AsyncStatus } from "../../db/definitions";

export function getAsyncStatus(item: AsyncType): AsyncStatus {
  if (!!item.COMPLETED && !item.LERROR) return "COMPLETED";
  if (!!item.COMPLETED && item.LERROR) return "ERROR";
  if (!!item.STARTED && item.STARTED < NOW) return "STARTED";
  if (!!item.STARTED && isFiveMinAgo(item.STARTED)) return "STALLED";
  if (!!item.SUBMITTED && item.SUBMITTED) return "PENDING";
  return "UNKNOWN";
}

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
    case "STARTED":
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
    case "COMPLETED":
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
