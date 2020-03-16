import React from "react";
import moment from "moment";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimesCircle,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { ProcessInfo } from "../../common/types";
import { cardColor, cardIcon, cardBorderColor } from "./functions";

import "./index.css";

interface PropType {
  item: ProcessInfo;
  dateFormat: string;
}

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

const healthStatus = (item: ProcessInfo) => {
  if (item.stalled > 0)
    return <span style={{ color: "red" }}>Interrupted</span>;
  if (item.errors > 0 && item.success == 0)
    return <span style={{ color: "salmon" }}>Bad</span>;
  if (item.errors > 0) return <span style={{ color: "orange" }}>Good</span>;
  if (item.success > 0)
    return <span style={{ color: "green" }}>Excellent</span>;
  return <span style={{ color: "gray" }}>Unknown</span>;
};

const stalledText = (item: ProcessInfo, url: string) => {
  return (
    <React.Fragment>
      <Card.Link href={url}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          color={item.stalled > 0 ? "red" : "lightgrey"}
          style={{ minWidth: "40px" }}
        />{" "}
        {item.stalled}
      </Card.Link>{" "}
      {item.stalled === 1
        ? " stalled item detected"
        : " stalled items detected"}
    </React.Fragment>
  );
};

const errorsText = (item: ProcessInfo, url: string) => {
  return (
    <React.Fragment>
      <Card.Link href={url}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          color={item.errors > 0 ? "SandyBrown" : "lightgrey"}
          style={{ minWidth: "40px" }}
        />{" "}
        {item.errors}
      </Card.Link>{" "}
      {item.errors === 1 ? "item have failed" : "items have failed"}
    </React.Fragment>
  );
};

const completedText = (item: ProcessInfo, url: string) => {
  const completed = item.success || 0;
  return (
    <React.Fragment>
      <Card.Link href={url}>
        <FontAwesomeIcon
          icon={faCheck}
          color={completed > 0 ? "green" : "lightgrey"}
          style={{ minWidth: "40px" }}
        />{" "}
        {completed}
      </Card.Link>{" "}
      {completed === 1 ? "item completed" : "items completed"}
    </React.Fragment>
  );
};

export const DashboardCard = ({ item, dateFormat }: PropType) => {
  return (
    <Card
      style={{
        width: "20rem",
        minHeight: "420px",
        borderRadius: "1rem",
        borderWidth: "12px"
      }}
      className="float-left m-1"
      border={cardBorderColor(item)}
    >
      <Card.Header
        style={{
          fontSize: "1.25rem",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        <Card.Link
          style={{
            color: "black"
          }}
          href={`${process.env.CLIENT_ROOT_PATH}${item.detailsurl}`}
        >
          {item.pname}
        </Card.Link>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>
          <Card.Text>
            <FontAwesomeIcon
              icon={cardIcon(item)}
              color={cardColor(item)}
              size="lg"
            />
          </Card.Text>
        </Card.Title>
        <Card.Text>
          Health status : <b>{healthStatus(item)}</b>
        </Card.Text>
        {item.processid === "PROCMON" ? (
          <Card.Text style={{ textAlign: "center" }}>
            {item.cserverid}
          </Card.Text>
        ) : (
          undefined
        )}
      </Card.Body>
      {item.processid !== "PROCMON" ? (
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Card.Text className="text-center">
              {`${item.count} items listed`}
            </Card.Text>
          </ListGroupItem>
        </ListGroup>
      ) : (
        undefined
      )}
      {item.processid !== "PROCMON" ? (
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Card.Text>
              {stalledText(
                item,
                `${process.env.CLIENT_ROOT_PATH}${item.detailsurl},status=STALLED`
              )}
            </Card.Text>
            <Card.Text>
              {errorsText(
                item,
                `${process.env.CLIENT_ROOT_PATH}${item.detailsurl},status=ERROR`
              )}
            </Card.Text>
            <Card.Text>
              {completedText(
                item,
                `${process.env.CLIENT_ROOT_PATH}${item.detailsurl},status=SUCCESS`
              )}
            </Card.Text>
          </ListGroupItem>
        </ListGroup>
      ) : (
        undefined
      )}
      <Card.Footer>
        {!!item.lastcheck
          ? `Last process done ${timeAgo.format(
              moment(item.lastcheck).toDate()
            )}`
          : "No items processed today"}
      </Card.Footer>
    </Card>
  );
};
