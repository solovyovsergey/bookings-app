import { shortISO } from "./date-wrangler";

export const getData = (url: string) =>
  fetch(url).then((resp) => {
    if (!resp.ok) throw new Error("There was a problem fetching dada");

    return resp.json();
  });

export const getBookings = (
  bookableId: number,
  startDate: Date,
  endDate: Date
) => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

  return getData(`${urlRoot}?${query}`);
};
