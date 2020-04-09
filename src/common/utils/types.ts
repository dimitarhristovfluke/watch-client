import * as R from "ramda";

// TODO move this to api/ui?

// --- Settings ------------------------------------------------------------- //
export interface Permissions {
  [index: string]: string[];
}

export interface Currency {
  id: string;
  label: string;
  symbol: string;
}

// --- Local Storage -------------------------------------------------------- //
export interface LocalStorage {
  get: <T>(key: string, defaultValue?: T) => T;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
}

export interface TokenService {
  get: () => string;
  set: (path: string) => void;
}

// --- Push Notifications --------------------------------------------------- //
export type EventHandler = (e: Event) => any;
