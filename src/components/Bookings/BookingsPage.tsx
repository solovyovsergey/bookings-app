import { useState } from "react";
import { Bookable } from "../../types";
import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";

export default function BookingsPage() {
  const [bookable, setBookable] = useState<Bookable | null>(null);

  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
}
