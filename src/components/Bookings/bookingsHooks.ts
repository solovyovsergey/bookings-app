import { useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { Bookable, Booking } from "../../types";
import { shortISO } from "../../utils/date-wrangler";
import { getGrid, transformBookings } from "./grid-builder";

export function useBookings(
  bookableId: number | null,
  startDate: Date,
  endDate: Date
) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";
  const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

  const query = useFetch<Booking[]>(`${urlRoot}?${queryString}`);

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query,
  };
}

export function useGrid(bookable: Bookable | null, startDate: Date) {
  return useMemo(
    () =>
      bookable
        ? getGrid(bookable, startDate)
        : { grid: null, dates: [], sessions: [] },
    [bookable, startDate]
  );
}
