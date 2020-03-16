export interface ProcessInfo {
  processid: string;
  pname: string;
  pending: number;
  errors?: number;
  success?: number;
  count?: number;
  lastcheck?: Date;
  detailsurl: string;
  cserverid?: string;
  stalled?: number;
}
