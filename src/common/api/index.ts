import React from "react";
import localStorageImpl from "../../common/utils/local-storage";
import Token from "../../common/utils/token";
import { setLocationHref } from "../../common/utils/window-location";

export interface Headers {
  [name: string]: string;
}

interface Options extends Headers {
  "XT-UserAgent": string;
  Authenticate: string;
}

type Method = "put" | "get" | "post" | "delete";

interface Response<T> {
  status: number;
  data: T;
}

interface ApiError {
  textStatus: string;
  status: number;
  data: any;
}

const localStorage = localStorageImpl("test", "HELPDESK");
const token = Token(localStorage).get();

// method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authenticate: token,
//     "XT-UserAgent": "HEALTH_DASH"
//   },
//   body: `status=${this.state.filter?.value || ""}&page=${page}&sort=${this
//     .state.orderBy?.field || ""}&dest=${this.state.orderBy?.dest || ""}`

// good old api call that resolves "data"
export const ApiCall = <T>(
  method: Method,
  path: string,
  body?: any,
  headers?: Headers
) =>
  fetch(`${process.env.REACT_APP_API_ROOT_PATH_2}${path}`, {
    method,
    body,
    headers: {
      Authenticate: token,
      "XT-UserAgent": "HEALTH_DASH",
      ...headers,
    },
  }).then<T>((res) => {
    switch (res.status) {
      case 200: // ok
        return res.json();
      case 401: // unauhtorized
        setLocationHref(`${process.env.REACT_APP_CLIENT_ROOT_PATH}/login`);
        return null;
      case 403: // forbidden
        return null;
      case 405: // Method nod allowed
        return null;
    }
  });
