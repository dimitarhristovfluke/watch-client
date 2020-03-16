import React from "react";
import { Navbar } from "react-bootstrap";
import "../../env";

export default function MyNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href={process.env.CLIENT_ROOT_PATH}>
        <img
          alt="eMaint"
          src="https://x46.emaint.com/graphics/emaint-favco-57x57.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        eMaint Services Dashboard - X4
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}
