import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimesCircle,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
import { ProcessInfo } from "../../common/types";
import { cardColor, cardIcon, cardBorderColor } from "./functions";
import { toCurrentTimeZone } from "../../common/functions";

import "./index.scss";

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
  if (item.errors > 0 && item.success === 0)
    return <span style={{ color: "salmon" }}>Bad</span>;
  if (item.errors > 0) return <span style={{ color: "orange" }}>Good</span>;

  return <span style={{ color: "green" }}>Excellent</span>;
};

const stalledText = (item: ProcessInfo, url: string) => {
  return (
    <React.Fragment>
      <Link to={url}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="minWidth40"
          color={item.stalled > 0 ? "red" : "lightgrey"}
        />{" "}
        {item.stalled}
      </Link>{" "}
      {item.stalled === 1
        ? " stalled item detected"
        : " stalled items detected"}
    </React.Fragment>
  );
};

const errorsText = (item: ProcessInfo, url: string) => {
  return (
    <React.Fragment>
      <Link to={url}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          color={item.errors > 0 ? "SandyBrown" : "lightgrey"}
          className="minWidth40"
        />{" "}
        {item.errors}
      </Link>{" "}
      {item.errors === 1 ? "item have failed" : "items have failed"}
    </React.Fragment>
  );
};

const completedText = (item: ProcessInfo, url: string) => {
  const completed = item.success || 0;
  return (
    <React.Fragment>
      <Link to={url}>
        <FontAwesomeIcon
          icon={faCheck}
          color={completed > 0 ? "green" : "lightgrey"}
          className="minWidth40"
        />{" "}
        {completed}
      </Link>{" "}
      {completed === 1 ? "item completed" : "items completed"}
    </React.Fragment>
  );
};

export const DashboardCard = ({ item }: PropType) => {
  return (
    <Card
      className="float-left m-1 dashboard-card"
      border={cardBorderColor(item)}
    >
      <Card.Header className="dashboard-card-header">
        <Link
          style={{
            color: "black"
          }}
          to={`${item.detailsurl}`}
        >
          {item.pname}
        </Link>
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
              {stalledText(item, `${item.detailsurl}/status/STALLED`)}
            </Card.Text>
            <Card.Text>
              {errorsText(item, `${item.detailsurl}/status/ERROR`)}
            </Card.Text>
            <Card.Text>
              {completedText(item, `${item.detailsurl}/status/SUCCESS`)}
            </Card.Text>
          </ListGroupItem>
        </ListGroup>
      ) : (
        undefined
      )}
      <Card.Footer>
        {!!item.lastcheck
          ? `Last process done ${timeAgo.format(
              toCurrentTimeZone(item.lastcheck).toDate()
            )}`
          : "No items processed today"}
      </Card.Footer>
    </Card>
  );
};
