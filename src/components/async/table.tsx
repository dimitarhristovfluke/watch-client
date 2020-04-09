import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AsyncType } from "../../db/definitions";
import "../../env";
import { getStatusIcon } from "./functions";
import { List, Column } from "../../common/interfaces";
import Date from "../../common/components/date";
import { merge1, merge2 } from "../../common/merge";
import api from "./api";
import SimpleTable from "../../common/components/simpletable";

interface AsyncTableProps {
  match: {
    params: {
      table: string;
      status: string;
    };
  };
}

class AsyncTable extends React.Component<AsyncTableProps, List<AsyncType>> {
  constructor(props: AsyncTableProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
        items: [],
        pageNumber: 1,
        totalPages: 0,
        totalRecords: 0,
      },
      orderBy: {
        field: "submitted",
        dest: "desc",
      },
      filter: props.match.params.status
        ? { field: "status", op: "eq", value: props.match.params.status }
        : undefined,
    };
  }

  fetchData = (page: number = 1) => {
    const {
      match: { params },
    } = this.props;

    const body = `status=${this.state.filter?.value || ""}&page=${page}&sort=${
      this.state.orderBy?.field || ""
    }&dest=${this.state.orderBy?.dest || ""}`;

    api()
      .list(params.table, body)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.fetchData();
  }

  componentDidUpdate(pp, ps) {
    const {
      match: { params },
    } = this.props;
    const nextTable = params.table;
    const prevTable = pp.match.params.table;
    const { pageNumber } = this.state.data;
    const tableChanged = nextTable && nextTable !== prevTable;
    if (
      tableChanged ||
      pageNumber !== ps.data.pageNumber ||
      this.state.orderBy?.field !== ps.orderBy?.field ||
      this.state.orderBy?.dest !== ps.orderBy?.dest ||
      this.state.filter?.value !== ps.filter?.value
    ) {
      if (tableChanged) this.setState(merge1("isLoaded", false, this.state));
      this.fetchData(tableChanged ? 1 : pageNumber);
    }
  }

  componentWillUnmount() {
    // clean up
  }

  onPage = (page: number) => {
    const { data } = this.state;
    switch (page) {
      case -1:
        this.setState(
          merge2("data", "pageNumber", data.pageNumber - 1, this.state)
        );
        break;
      case 0:
        this.setState(
          merge2("data", "pageNumber", data.pageNumber + 1, this.state)
        );
        break;
      default:
        if (page > 0)
          this.setState(merge2("data", "pageNumber", page, this.state));
        break;
    }
  };

  onOrder = (field: string) => {
    if (this.state.orderBy?.field !== field)
      this.setState({ orderBy: { field, dest: "asc" } });
    else
      this.setState({
        orderBy: {
          field,
          dest: this.state.orderBy?.dest === "asc" ? "desc" : "asc",
        },
      });
  };

  onStatusChange = (status: string) =>
    this.setState({ filter: { field: "status", op: "eq", value: status } });

  getLinkTo = (table: string) => (item: AsyncType) => (
    <Link to={`/async/${table}/${item.id}`}>{item.id}</Link>
  );

  toDateTimeString = (fieldName: string) => (item: AsyncType) => (
    <Date date={item[fieldName]} />
  );

  columnsList = () => {
    const {
      match: { params },
    } = this.props;

    const tableName = params.table;
    const columns: Column<AsyncType>[] = [
      {
        name: "cstatus",
        fn: getStatusIcon,
        label: "Status",
      },
      {
        name: "cautoid",
        fn: this.getLinkTo(tableName),
        label: "Process ID",
      },
      {
        name: "username",
        label: "Username",
      },
      {
        name: "submitted",
        fn: this.toDateTimeString("submitted"),
        label: "Submitted",
      },
      {
        name: "started",
        fn: this.toDateTimeString("started"),
        label: "Started",
      },
      {
        name: "completed",
        fn: this.toDateTimeString("completed"),
        label: "Completed",
      },
    ];

    return columns;
  };

  render() {
    const { error, isLoaded, data, orderBy, filter } = this.state;
    const { items } = data;
    const {
      match: { params },
    } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <SimpleTable<AsyncType>
          columns={this.columnsList()}
          data={data}
          isLoaded={isLoaded}
          error={error}
          onPage={this.onPage}
          onOrder={this.onOrder}
          orderBy={orderBy}
          onStatusChange={this.onStatusChange}
          filter={filter}
        />
      );
    }
  }
}

export default AsyncTable;
