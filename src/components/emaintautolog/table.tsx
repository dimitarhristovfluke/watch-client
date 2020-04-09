import React from "react";
import { EmaintAutoLogType } from "../../db/definitions";
import "../../env";
import { getStatusIcon } from "./functions";
import { List, Column } from "../../common/interfaces";
import api from "./api";
import SimpleTable from "../../common/components/simpletable";
import Date from "../../common/components/date";
import { merge2 } from "../../common/merge";

interface EmaintAutoLogTableProps {}

class EmaintAutoLogTable extends React.Component<
  EmaintAutoLogTableProps,
  List<EmaintAutoLogType>
> {
  constructor(props: EmaintAutoLogTableProps) {
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
        field: "timestamp",
        dest: "desc",
      },
    };
  }

  fetchData = (page: number = 1) => {
    const body = `&page=${page}&sort=${this.state.orderBy?.field || ""}&dest=${
      this.state.orderBy?.dest || ""
    }`;

    api()
      .list(body)
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
    this.fetchData();
  }

  componentWillUnmount() {
    // clean up
  }

  componentDidUpdate(pp, ps) {
    const { pageNumber } = this.state.data;
    if (
      pageNumber !== ps.data.pageNumber ||
      this.state.orderBy?.field !== ps.orderBy?.field ||
      this.state.orderBy?.dest !== ps.orderBy?.dest ||
      this.state.filter?.value !== ps.filter?.value
    ) {
      this.fetchData();
    }
  }

  toDateTimeString = (fieldName: string) => (item: EmaintAutoLogType) => (
    <Date date={item[fieldName]} />
  );

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

  columnsList = () => {
    const columns: Column<EmaintAutoLogType>[] = [
      {
        name: "status",
        fn: getStatusIcon,
        label: "Status",
      },
      {
        name: "timestamp",
        fn: this.toDateTimeString("timestamp"),
        label: "Date/time",
      },
      {
        name: "cautoid",
        label: "Process ID",
      },
      {
        name: "cautodesc",
        label: "Command",
      },
      {
        name: "cprogram",
        label: "Program Executed",
      },
      {
        name: "nlineno",
        label: "Line No",
      },
      {
        name: "cerrormsg",
        label: "Error Message",
      },
      {
        name: "crunid",
        label: "Run ID",
      },
    ];

    return columns;
  };

  render() {
    const { error, isLoaded, data, orderBy } = this.state;
    const { items } = data;
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <SimpleTable<EmaintAutoLogType>
          columns={this.columnsList()}
          data={data}
          isLoaded={isLoaded}
          error={error}
          onPage={this.onPage}
          onOrder={this.onOrder}
          orderBy={orderBy}
        />
      );
    }
  }
}

export default EmaintAutoLogTable;
