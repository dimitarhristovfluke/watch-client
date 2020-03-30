import React, { StatelessComponent } from "react";
import "../../env";
import Moment from "react-moment";

interface PropTypes {
  date: Date;
}
const Date: StatelessComponent<PropTypes> = ({ date }: PropTypes) => {
  return !!date ? (
    <Moment format={process.env.REACT_APP_dateTimeFormat}>{date}</Moment>
  ) : (
    <span>Unknown date</span>
  );
};

export default Date;
