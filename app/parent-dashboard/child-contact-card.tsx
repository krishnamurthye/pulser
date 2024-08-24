"use client";

import { getFormattedDate } from "../utils/util-fn";

const ChildContactCard = ({ child }: any) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">
        {child.firstName + " " + child.lastName}
      </h2>
      <p>Grade: {child?.schooling[0]?.grade}</p>
      <p>Start Date: {getFormattedDate(child?.lsaRequests[0]?.start_date)}</p>
      <p>End Date: {getFormattedDate(child?.lsaRequests[0]?.end_date)}</p>
      <p>Status: {child?.schooling[0]?.status}</p>
    </div>
  );
};

export default ChildContactCard;
