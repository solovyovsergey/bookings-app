import { useReducer, useState } from "react";
import BookingDetails from "./BookingDetails";
import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import { reducer as weekReducer } from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { Bookable, Booking } from "../../types";
import { BookingInfo } from "./Booking";

type BookingsProp = {
  bookable: Bookable | null;
};

const Bookings = ({ bookable }: BookingsProp) => {
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  const [booking, setBooking] = useState<BookingInfo | null>(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />

        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>

      <BookingDetails booking={booking} bookable={bookable} />
    </div>
  );
};

export default Bookings;
