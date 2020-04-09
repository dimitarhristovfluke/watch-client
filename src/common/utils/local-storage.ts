import * as R from "ramda";
import { LocalStorage } from "./types";

const catcher = (_: any, key: string) =>
  // tslint:disable-next-line
  console.log(
    `Failed to access local storage. I'm guessing you're incognito in Safari. Very Clever. I will not remember your ${key}.`
  );

export default (userName: string, tenant: string): LocalStorage => {
  const localKey = (name: string): string => `${name}_${userName}_${tenant}`;

  const setter = <T>(key: string, value: T) =>
    !localStorage
      ? null
      : value == undefined
      ? localStorage.removeItem(localKey(key))
      : localStorage.setItem(localKey(key), JSON.stringify(value));
  const remover = (key: string) =>
    localStorage && localStorage.removeItem(localKey(key));

  return {
    get: <T>(key: string, defaultValue?: T): T => {
      if (!localStorage) {
        return defaultValue;
      }
      const str = localStorage.getItem(localKey(key));
      if (str === "undefined" || str === "null") {
        return defaultValue;
      }
      const value = JSON.parse(str || "null");
      return value ? value : defaultValue;
    },
    set: R.tryCatch(setter, catcher),
    remove: R.tryCatch(remover, catcher)
  };
};
