import Moment from "moment";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { ProcDefType } from "../../db/definitions";
import { toCurrentTimeZone } from "../../common/functions";

export const isAlive = (lastCheck: Date, validityFor: number = 60) =>
  Moment(toCurrentTimeZone(lastCheck))
    .add(validityFor, "s")
    .toDate()
    .valueOf() >
  Moment(Date.now())
    .toDate()
    .valueOf();

export const getProcMonItems = (items: ProcDefType[]) =>
  items.filter(r => r.procname === "PROCMON");

export const getProcMonItem = (items: ProcDefType[], serverId: string) =>
  items.find(r => r.procname === "PROCMON" && r.cserverid === serverId);

export const isProcMonAlive = (items: ProcDefType[], serverId: string) =>
  isAlive(getProcMonItem(items, serverId).lastcheck);

export const isProcMon = (item: ProcDefType) =>
  item && item.procname === "PROCMON";

export const cardIcon = (item: ProcDefType) =>
  isAlive(item.lastcheck) ? faCheckCircle : faTimesCircle;

export const cardColor = (item: ProcDefType) =>
  isAlive(item.lastcheck) ? "green" : "red";
