import Moment from "moment";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import { ProcessInfo } from "../../common/types";

export const cardIcon = (item: ProcessInfo) => {
  if (!!item.ERRORS && item.ERRORS > 0) return faTimesCircle;
  if (item.PENDING > 0) return faExclamationTriangle;
  return faCheckCircle;
};

export const cardColor = (item: ProcessInfo) => {
  if (!!item.ERRORS && item.ERRORS > 0) return "#c80000";
  if (item.PENDING > 0) return "#dcca00";
  return "#00c800";
};
