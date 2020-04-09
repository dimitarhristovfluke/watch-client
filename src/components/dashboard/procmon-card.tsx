import React from "react";
import * as R from "ramda";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
import { ProcessInfo } from "../../common/types";
import {
  cardBorderColor,
  healthStatus,
  procmonCardIcon,
  procmonCardColor,
  procmonOveralHalthStatus,
  procmonHealthStatus,
} from "./functions";

import "./index.scss";

interface PropType {
  items: ProcessInfo[];
  dateFormat: string;
}

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

const borderColor = (items: ProcessInfo[]) => {
  const borderColors = items.map((i) => cardBorderColor(i));
  if (R.contains("danger", borderColors)) return "danger";
  if (R.contains("warning", borderColors)) return "warning";
  return "success";
};

export const ProcmonDashboardCard = ({ items }: PropType) => {
  return (
    <Card className="float-left m-1 dashboard-card" border={borderColor(items)}>
      <Card.Header className="dashboard-card-header">
        <Link
          style={{
            color: "black",
          }}
          to={`${items[0].detailsurl}`}
        >
          {items[0].pname}
        </Link>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>
          <Card.Text>
            <FontAwesomeIcon
              icon={procmonCardIcon(items)}
              color={procmonCardColor(items)}
              size="lg"
            />
          </Card.Text>
        </Card.Title>
        <Card.Text>
          Health status : <b>{procmonOveralHalthStatus(items)}</b>
        </Card.Text>
        {items.map((i) => (
          <Card.Text style={{ textAlign: "center" }}>
            <Link
              style={{
                color: "black",
              }}
              to={`${i.detailsurl}`}
            >
              <div style={{ width: 80 }}>{i.cserverid}</div>
            </Link>
            : {procmonHealthStatus(i)}
          </Card.Text>
        ))}
      </Card.Body>
    </Card>
  );
};
