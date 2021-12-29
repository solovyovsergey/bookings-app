import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getData } from "../../utils/api";
import { Spinner } from "../UI/Spinner";
import { Bookable } from "../../types";

type BookablesListProps = {
  bookable: Bookable | null;
  setBookable: (val: Bookable) => void;
};

export default function BookablesList({
  bookable,
  setBookable,
}: BookablesListProps) {
  const [bookables, setBookables] = useState<Bookable[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = Array.from(new Set(bookables.map((b) => b.group)));

  useEffect(() => {
    getData<Bookable[]>("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === event.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  };

  const nextBookable = () => {
    const i = bookablesInGroup.indexOf(bookable as Bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  };

  if (error) return <p>{error.message}</p>;
  if (isLoading)
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li
            key={b.id}
            className={b.id === bookable?.id ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
