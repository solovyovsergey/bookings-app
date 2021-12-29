import { useEffect } from "react";
import { Bookable, Booking } from "../../types";
import { Spinner } from "../UI/Spinner";
import { BookingInfo } from "./Booking";
import { useBookings, useGrid } from "./bookingsHooks";
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

  const { bookings, isLoading, error } = useBookings(
    bookable?.id || null,
    week.start,
    week.end
  );

  const { grid, sessions, dates } = useGrid(bookable, week.start);

  // Deselect the booking when switching weeks or bookables.
  useEffect(() => {
    setBooking(null);
  }, [bookable, week.start, setBooking]);

  function cell(session: string, date: string) {
    const cellData =
      bookings?.[session]?.[date] || grid?.[session][date] || null;

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={!isLoading ? () => setBooking(cellData) : undefined}
      >
        {cellData?.title}
      </td>
    );
  }

  // ! Loading is infinite if grid is undefined
  if (!grid) {
    return <p>Waiting for bookable and week details...</p>;
  }

  return (
    <>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error.message})`}
        </p>
      )}
      <table className={!isLoading ? "bookingsGrid active" : "bookingsGrid"}>
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
