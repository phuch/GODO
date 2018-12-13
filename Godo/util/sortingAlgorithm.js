import _ from "lodash";
import moment from "moment";
/**
 * @param {array} events - list of events to be sorted
 * @description
 *   sort the given arrays in a order that respect Date & Time and the ratio of attendees.
 *   This function returns the most optimal events for user in
 */
export const sortEvents = events => {
  const calculateWeight = event => {
    const now = moment(Date.now());
    const eventDate = moment.unix(event.time.seconds);
    const timeDiff = Math.abs(now.diff(eventDate, "days"));
    const attendeesRatio = event.attendees.length / event.slots;

    if (timeDiff < 8) {
      return (attendeesRatio + 1) * (8 - timeDiff);
    } else {
      return 1 - (timeDiff * 0.4 - attendeesRatio * 0.6);
    }
  };
  return _.orderBy(events, event => calculateWeight(event), ["desc"]);
};
