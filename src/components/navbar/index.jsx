import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../env";

export default function MyNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to={"/"}>
        <Navbar.Brand>
          <img
            alt="eMaint"
            src="/graphics/emaint-favco-57x57.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          eMaint Services Dashboard - X4
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}
