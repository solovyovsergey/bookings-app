import { FaEdit } from "react-icons/fa";
import { Bookable } from "../../types";
import { useUser } from "../Users/UserContext";
import { BookingInfo, BookingUI } from "./Booking";

type BookingDetailsProps = {
  booking: BookingInfo | null;
  bookable: Bookable | null;
};

const BookingDetails = ({ booking, bookable }: BookingDetailsProps) => {
  const [user] = useUser();

  const isBooker = booking && user && booking.bookerId === user.id;
  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button className="btn">
              <FaEdit />
            </button>
          </span>
        )}
      </h2>

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
