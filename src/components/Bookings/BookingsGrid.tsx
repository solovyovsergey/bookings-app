import { useEffect, useMemo, useState } from "react";
import { Bookable, Booking, Grid } from "../../types";
import { getBookings } from "../../utils/api";
import { Spinner } from "../UI/Spinner";
import { BookingInfo } from "./Booking";
import { getGrid, transformBookings } from "./grid-builder";
import { Week } from "./weekReducer";

type BookingsGridProps = {
  week: Week;
  bookable: Bookable | null;
  booking: BookingInfo | null;
  setBooking: (val: BookingInfo | null) => void;
};

export type ViewBookings = Record<string, Record<string, Booking>>;

const BookingsGrid = (props: BookingsGridProps) => {
  const { week, bookable, booking, setBooking } = props;
  const [bookings, setBookings] = useState<ViewBookings | null>(null);
  const [error, setError] = useState(false);

  // ! potential error if grid is undefined
  const { grid, sessions, dates } = useMemo(
    () =>
      bookable
        ? getGrid(bookable, week.start)
        : { grid: null, dates: [], sessions: [] },

    [bookable, week.start]
  );

  useEffect(() => {
    if (bookable) {
      let doUpdate = true;

      setBookings(null);
      setError(false);
      setBooking(null);

      getBookings(bookable.id, week.start, week.end)
        .then((resp) => {
          if (doUpdate) {
            setBookings(transformBookings(resp));
          }
        })
        .catch(setError);

      return () => {
        doUpdate = false;
      };
    }
  }, [week, bookable, setBooking]);

  function cell(session: string, date: string) {
    const cellData =
      bookings?.[session]?.[date] || grid?.[session][date] || null;

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={bookings ? () => setBooking(cellData) : undefined}
      >
        {cellData?.title}
      </td>
    );
  }

  // ! Loading is infinite if grid is undefined
  if (!grid) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{new Date(d).toDateString()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default BookingsGrid;
