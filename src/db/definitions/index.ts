export interface ProcDefType {
  procdefid: string;
  procname: string;
  proccmdlin: string;
  procmin: number;
  proccount: number;
  taskdesc: string;
  lastcheck: Date;
  cserverid: string;
  procmon: boolean;
  procctrol: boolean;
  lrecycle: boolean;
  nrecevery: number;
  crecintrvl: string;
}

export interface ProcStatType {
  pid: string;
  pname: string;
  cmdline: string;
  start: Date;
  status: string;
  palive: boolean;
  pelapsed: number;
  pkilled: boolean;
  cserverid: string;
}

export interface EmaintAutoType {
  cautoid: string;
  cdescrip: string;
  dlastrun: Date;
  dnextrun: Date;
  nevery: number;
  cinterval: string;
  ccode: string;
  crunid: string;
  status: string;
  message: string;
  cserverid: string;
}

export interface EmaintAutoLogType {
  cuid: string;
  timestamp: Date;
  cautoid: string;
  cautodesc: Date;
  cprogram: string;
  nlineno: boolean;
  nerrno: number;
  cerrormsg: string;
  ccode: string;
  cdetails: string;
  crunid: string;
}

export interface AsyncType {
  id: string;
  title: string;
  username: string;
  submitted: Date;
  started: Date;
  completed: Date;
  status: string;
  lerror: boolean;
  lcanceled: boolean;
  inputdata: string;
  returndata: string;
  properties: string;
}

export type AsyncStatus =
  | "RUNNING"
  | "PENDING"
  | "COMPLETED"
  | "ERROR"
  | "STALLED"
  | "UNKNOWN";

export type AutorunStatus =
  | "RUNNING"
  | "PENDING"
  | "COMPLETED"
  | "ERROR"
  | "STALLED"
  | "UNKNOWN";
