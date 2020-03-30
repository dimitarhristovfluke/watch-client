import React, { StatelessComponent } from "react";
import "../../env";
import Moment from "moment";

interface PropTypes {
  seconds: number;
}
const Elapsed: StatelessComponent<PropTypes> = ({ seconds }: PropTypes) => {
  const fromNow = Moment(Date.now())
    .add(-seconds, "s")
    .fromNow();

  return !!fromNow ? <span>{fromNow}</span> : <span>unknown</span>;
};

export default Elapsed;
