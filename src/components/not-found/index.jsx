import React from "react";

export class NotFound extends React.Component {
  render() {
    return `Page not found...root path is ${process.env.CLIENT_ROOT_PATH}`;
  }
}
