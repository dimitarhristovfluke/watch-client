import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { ProcessInfo } from "../../common/types";
import { cardColor, cardIcon } from "./functions";

interface PropType {
  item: ProcessInfo;
  dateFormat: string;
}

const pendingText = (item: ProcessInfo) => {
  return item.PENDING > 0 ? (
    <React.Fragment>
      <FontAwesomeIcon icon={faExclamationTriangle} color="gold" />
      {item.PENDING}
      {item.PENDING === 1 ? " item is pending" : " items are pending"}
    </React.Fragment>
  ) : (
    "No pending items detected"
  );
};

const errorsText = (item: ProcessInfo) => {
  return item.ERRORS > 0 ? (
    <React.Fragment>
      <FontAwesomeIcon icon={faTimesCircle} color="red" /> {item.ERRORS}
      {item.ERRORS === 1 ? " item have failed" : " items have failed"}
    </React.Fragment>
  ) : (
    "No failed items detected"
  );
};

export const DashboardCard = ({ item, dateFormat }: PropType) => {
  return (
    <Card style={{ width: "18rem" }} className="float-left m-1">
      <Card.Body>
        <Card.Title>
          <FontAwesomeIcon
            icon={cardIcon(item)}
            color={cardColor(item)}
            size="lg"
          />
          &nbsp;
          {item.PNAME}
        </Card.Title>
        {item.PROCESSID === "PROCMON" ? (
          <Card.Text>
            {item.ERRORS > 0 ? "ProcMon has stopped" : "ProcMon is running!"}
          </Card.Text>
        ) : (
          <Card.Text>{`${item.COUNT} items listed`}</Card.Text>
        )}
      </Card.Body>
      {item.PROCESSID !== "PROCMON" ? (
        <ListGroup className="list-group-flush">
          <ListGroupItem>{pendingText(item)}</ListGroupItem>
          <ListGroupItem>{errorsText(item)}</ListGroupItem>
        </ListGroup>
      ) : (
        undefined
      )}
      <Card.Body>
        <Card.Link href={item.DETAILSURL}>View More</Card.Link>
      </Card.Body>
    </Card>
  );
};
