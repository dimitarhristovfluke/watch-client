import Moment from "moment";
import "moment-timezone";
import "../env";

const isOlderThan = (date: Date, seconds: number) =>
  Moment(toCurrentTimeZone(date))
    .add(seconds, "s")
    .toDate()
    .valueOf() <
  Moment(Date.now())
    .toDate()
    .valueOf();

const isFutureDate = (date: Date) =>
  Moment(toCurrentTimeZone(date))
    .toDate()
    .valueOf() >
  Moment(Date.now())
    .toDate()
    .valueOf();

export const NOW = new Date();

export const isOneMinAgo = (date: Date) => !date || isOlderThan(date, 60);
export const isFiveMinAgo = (date: Date) => !date || isOlderThan(date, 300);
export const isPastDate = (date: Date) => !date || isOlderThan(date, 1);
export const clientZoneOffset = Moment.parseZone(new Date()).utcOffset();
export const toCurrentTimeZone = (date: Date) =>
  Moment(date).add(
    process.env.SERVER_ZONE_OFFSET + clientZoneOffset,
    "minutes"
  );

export const properCase = function(s: string) {
  return s.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};
