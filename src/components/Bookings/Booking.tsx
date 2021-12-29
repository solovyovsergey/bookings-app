import { Bookable } from "../../types";

export type BookingInfo = {
  title: string;
  date: string;
  session: string;
  bookerId: number;
  notes?: string;
};

type BookingProps = {
  booking: BookingInfo | null;
  bookable: Bookable | null;
};

export const BookingUI = ({ booking, bookable }: BookingProps) => {
  const { title, date, session, notes } = booking || {};

  return (
    <div className="booking-details-fields">
      <label>Title</label>
      <p>{title}</p>

      <label>Bookable</label>
      <p>{bookable?.title}</p>

      <label>Booking Date</label>
      <p>{date ? new Date(date).toDateString() : ""}</p>

      <label>Session</label>
      <p>{session}</p>

      {notes && (
        <>
          <label>Notes</label>
          <p>{notes}</p>
        </>
      )}
    </div>
  );
};
