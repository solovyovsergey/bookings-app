import { useState } from "react";
import { Bookable } from "../../types";
import { BookableDetails } from "./BookableDetails";
import BookablesList from "./BookablesList";

export const BookablesView = () => {
  const [bookable, setBookable] = useState<Bookable>();

  return (
    <>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </>
  );
};
