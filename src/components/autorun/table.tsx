import React from "react";
import { Link } from "react-router-dom";
import { EmaintAutoType } from "../../db/definitions";
import { getStatusIcon, getInterval } from "./functions";
import { List } from "../../common/interfaces";
import Date from "../../common/components/date";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";

interface AutorunTableProps {
  match: {
    params: {
      table: string;
      status: string;
    };
  };
}

class AutorunTable extends React.Component<
  AutorunTableProps,
  List<EmaintAutoType>
> {
  constructor(props: AutorunTableProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pageNumber: 1,
      pageSize: 10
    };
  }

  nextPage = () => this.setState({ pageNumber: this.state.pageNumber + 1 });
  prevPage = () => this.setState({ pageNumber: this.state.pageNumber - 1 });
  setPage = (page: number) => this.setState({ pageNumber: page });

  fetchData = (url: string) => {
    const {
      match: { params }
    } = this.props;
    const { pageNumber, pageSize } = this.state;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `status=${params.status ||
        ""}&page=${pageNumber}&pageSize=${pageSize}`
    };

    fetch(url, options)
      .then<EmaintAutoType[]>(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  componentDidUpdate(np, ns) {
    const {
      match: { params }
    } = this.props;
    const prevTable = params.table;
    const nextTable = np.match.params.table;
    if (
      (nextTable && nextTable !== prevTable) ||
      this.state.pageNumber !== ns.pageNumber
    ) {
      this.setState({ isLoaded: false });
      this.fetchData(
        `${process.env.REACT_APP_API_ROOT_PATH}/autorun/${nextTable}`
      );
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.fetchData(
      `${process.env.REACT_APP_API_ROOT_PATH}/autorun/${params.table}`
    );
  }

  componentWillUnmount() {
    // clean up
  }

  render() {
    const { error, isLoaded, items, pageNumber } = this.state;
    const {
      match: { params }
    } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Table bordered hover responsive>
            <tr>
              <th>Status</th>
              <th>Process ID</th>
              <th>Description</th>
              <th>Last Run</th>
              <th>Next Run</th>
              <th>Run Inteval</th>
              <th>Last Error Message</th>
            </tr>
            {items.map(item => (
              <tr>
                <td>{getStatusIcon(item.status)}</td>
                <td>
                  <Link to={`/autorun/${params.table}/${item.cautoid}`}>
                    {item.cautoid}
                  </Link>
                </td>
                <td>{item.cdescrip}</td>
                <td>
                  <Date date={item.dlastrun} />
                </td>
                <td>
                  <Date date={item.dnextrun} />
                </td>
                <td>{getInterval(item.nevery, item.cinterval)}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </Table>
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                onClick={() => this.prevPage()}
              ></PaginationLink>
            </PaginationItem>
            <PaginationItem active={pageNumber === 1}>
              <PaginationLink tag="button" onClick={() => this.setPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={pageNumber === 2}>
              <PaginationLink tag="button" onClick={() => this.setPage(2)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={pageNumber === 3}>
              <PaginationLink tag="button" onClick={() => this.setPage(3)}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={pageNumber === 4}>
              <PaginationLink tag="button" onClick={() => this.setPage(4)}>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={pageNumber === 5}>
              <PaginationLink tag="button" onClick={() => this.setPage(5)}>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={() => this.nextPage()}>
              <PaginationLink next tag="button"></PaginationLink>
            </PaginationItem>
          </Pagination>
        </React.Fragment>
      );
    }
  }
}

export default AutorunTable;
