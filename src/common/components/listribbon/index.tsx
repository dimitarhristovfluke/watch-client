import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class Breadcrumbs extends Component {
  render() {
    return (
      <Breadcrumb tag="nav">
        <BreadcrumbItem tag="a" href="/">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href="/autorun/autosched">
          Autorun
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }
}

export default Breadcrumbs;
