import { Bookable } from "../../types";
import { BookingInfo, BookingUI } from "./Booking";

type BookingDetailsProps = {
  booking: BookingInfo | null;
  bookable: Bookable | null;
};

const BookingDetails = ({ booking, bookable }: BookingDetailsProps) => {
  return (
    <div className="booking-details">
      <h2>Booking Details</h2>

      {booking ? (
        <BookingUI booking={booking} bookable={bookable} />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
