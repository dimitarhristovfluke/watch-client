import React from "react";
import * as R from "ramda";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface PropTypes {
  activePage: number;
  totalPages: number;
  onPage: (number) => void;
}

class Pager extends React.Component<PropTypes> {
  pagesList = () => {
    const { activePage, totalPages } = this.props;
    const firstPage = activePage > 2 ? activePage - 2 : 1;
    const lastPage = activePage < totalPages - 2 ? activePage + 2 : totalPages;

    const rangeOfPages = R.range(firstPage, lastPage);
    return R.uniq([1, ...rangeOfPages, totalPages]);
  };
  render() {
    const { activePage, totalPages, onPage } = this.props;
    return (
      <React.Fragment>
        <Pagination>
          <PaginationItem>
            <PaginationLink
              disabled={activePage < 2}
              first
              tag="button"
              onClick={() => onPage(1)}
            ></PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              disabled={activePage < 2}
              previous
              tag="button"
              onClick={() => onPage(-1)}
            ></PaginationLink>
          </PaginationItem>
          {this.pagesList().map(p => (
            <PaginationItem active={activePage === p}>
              <PaginationLink tag="button" onClick={() => onPage(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem onClick={() => onPage(0)}>
            <PaginationLink
              disabled={activePage > totalPages - 1}
              next
              tag="button"
            ></PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              disabled={activePage > totalPages - 1}
              last
              tag="button"
              onClick={() => onPage(totalPages)}
            ></PaginationLink>
          </PaginationItem>
        </Pagination>
      </React.Fragment>
    );
  }
}

export default Pager;
