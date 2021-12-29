import { sessions as sessionNames } from "../../static.json";
import { addDays, shortISO } from "../../utils/date-wrangler";
import { Bookable, Booking, Grid } from "../../types";
import { ViewBookings } from "./BookingsGrid";

export const getGrid = (
  bookable: Bookable,
  startDate: Date
): { grid: Grid; dates: string[]; sessions: string[] } => {
  const dates = bookable.days
    .sort()
    .map((d) => shortISO(addDays(startDate, d)));

  const sessions = bookable.sessions.map((i) => sessionNames[i]);

  const grid: Grid = {};

  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          bookableId: bookable.id,
          title: "",
          bookerId: 0, // TODO What is default value?
        })
    );
  });

  return {
    grid,
    dates,
    sessions,
  };
};

export const transformBookings = (bookingsArray: Booking[]) =>
  bookingsArray.reduce<ViewBookings>((bookings, booking) => {
    const { session, date } = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }

    bookings[session][date] = booking;

    return bookings;
  }, {});
