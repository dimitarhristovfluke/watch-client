import React from "react";

class NotFound extends React.Component {
  render() {
    return `Page not found...root path is ${process.env.REACT_APP_CLIENT_ROOT_PATH}`;
  }
}

export default NotFound;
