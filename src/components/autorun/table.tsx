import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { EmaintAutoType } from "../../db/definitions";
import { getStatusIcon, getInterval } from "./functions";
import { List, Column } from "../../common/interfaces";
import Date from "../../common/components/date";
import SimpleTable from "../../common/components/simpletable";
import { merge2, merge1 } from "../../common/merge";
import api from "./api";
// import localStorageImpl from "../../common/utils/local-storage";
// import Token from "../../common/utils/token";

interface AutorunTableProps {
  match: {
    params: {
      table: string;
      status: string;
    };
  };
}

type PropType = AutorunTableProps & RouteComponentProps;

class AutorunTable extends React.Component<PropType, List<EmaintAutoType>> {
  constructor(props: PropType) {
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
        field: "dnextrun",
        dest: "asc",
      },
      filter: props.match.params.status
        ? { field: "status", op: "eq", value: props.match.params.status }
        : undefined,
    };
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

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    // clean up
  }

  getLinkTo = (table: string) => (item: EmaintAutoType) => (
    <Link to={`/autorun/${table}/${item.cautoid}`}>{item.cautoid}</Link>
  );

  toDateTimeString = (fieldName: string) => (item: EmaintAutoType) => (
    <Date date={item[fieldName]} />
  );

  columnsList = () => {
    const {
      match: { params },
    } = this.props;

    const tableName = params.table;
    const columns: Column<EmaintAutoType>[] = [
      {
        name: "status",
        fn: getStatusIcon,
        label: "Status",
      },
      {
        name: "cautoid",
        fn: this.getLinkTo(tableName),
        label: "Process ID",
      },
      {
        name: "cdescrip",
        label: "Description",
      },
      {
        name: "dlastrun",
        fn: this.toDateTimeString("dlastrun"),
        label: "Last Run",
      },
      {
        name: "dnextrun",
        fn: this.toDateTimeString("dnextrun"),
        label: "Next Run",
      },
      {
        name: "cinterval",
        fn: getInterval,
        label: "Run Inteval",
      },
      {
        name: "logerrmsg",
        label: "Last Error Message",
      },
    ];

    return columns;
  };

  render() {
    const { error, isLoaded, data, orderBy, filter } = this.state;
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
        <SimpleTable<EmaintAutoType>
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

export default withRouter(AutorunTable);
