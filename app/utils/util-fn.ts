import moment from "moment";

export const getFormattedDate = (rawDate: any) => {
  return moment(rawDate).format("MMMM DD, YYYY");
};
