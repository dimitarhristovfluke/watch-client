import React from "react";
import { Column, ListData, OrderDestination, Filter } from "../../interfaces";
import { Table, Row, Col, Input } from "reactstrap";
import Pager from "./pager";

interface PropTypes<T> {
  data: ListData<T>;
  columns: Column<T>[];
  isLoaded: boolean;
  error: string;
  onPage: (number) => void;
  orderBy?: {
    field: string;
    dest: OrderDestination;
  };
  filter?: Filter;
  onOrder: (field: string) => void;
  onStatusChange?: (value: string) => void;
}

class SimpleTable<T> extends React.Component<PropTypes<T>> {
  render() {
    const {
      data,
      columns,
      error,
      isLoaded,
      orderBy,
      onPage,
      onOrder,
      onStatusChange,
      filter,
    } = this.props;
    const { items, pageNumber, totalPages } = data;

    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col lg={12}>
              <label style={{ marginBottom: "1rem" }}>Filter by status:</label>{" "}
              <Input
                type="select"
                name="status"
                onChange={(event) => onStatusChange(event.target.value)}
                value={filter?.value || ""}
                bsSize={"sm"}
                style={{ display: "inline-flex", width: "200px" }}
              >
                <option value={""}>All</option>
                <option value={"RUNNING"}>Running</option>
                <option value={"STALLED"}>Did not run</option>
                <option value={"PENDING"}>Pending</option>
                <option value={"SUCCESS"}>Success</option>
                <option value={"ERROR"}>Error</option>
                <option value={"UNKNOWN"}>Unknwon</option>
              </Input>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Table hover responsive striped>
                <tr>
                  {columns.map((col) => (
                    <th onClick={() => onOrder(col.name)}>
                      {col.label}{" "}
                      {orderBy?.field === col.name ? (
                        orderBy.dest === "asc" ? (
                          <i className="fa fa-caret-up" />
                        ) : (
                          <i className="fa fa-caret-down" />
                        )
                      ) : undefined}
                    </th>
                  ))}
                </tr>
                {items.map((item) => (
                  <tr>
                    {Object.keys(columns).map((key) => (
                      <td>
                        {columns[key].fn
                          ? columns[key].fn(item)
                          : item[columns[key].name] || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </Table>
              {totalPages > 1 ? (
                <Pager
                  activePage={pageNumber}
                  totalPages={totalPages}
                  onPage={onPage}
                />
              ) : undefined}
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default SimpleTable;
