import { LocalStorage, TokenService } from "./types";

export default (localStorage: LocalStorage): TokenService => ({
  get: () => localStorage.get<string>("token"),
  set: (token: string) => localStorage.set("token", token)
});
