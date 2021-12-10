import { ChangeEvent, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Actions, State, Types } from "./reducer";
import { getData } from "../../utils/api";
import { Spinner } from "../UI/Spinner";

type BookablesListProps = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

export default function BookablesList({ state, dispatch }: BookablesListProps) {
  const { group, bookableIndex, bookables, isLoading, error } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = Array.from(new Set(bookables.map((b) => b.group)));

  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch({ type: Types.fetchBookablesRequest });

    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        dispatch({ type: Types.fetchBookablesSuccess, payload: bookables });
      })
      .catch((err) => {
        dispatch({ type: Types.fetchBookablesError, payload: err });
      });
  }, [dispatch]);

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: Types.setGroup,
      payload: { group: event.target.value, bookableIndex: 0 },
    });
  };

  const changeBookable = (selectedIndex: number) => {
    dispatch({
      type: Types.setBookable,
      payload: selectedIndex,
    });

    nextButtonRef.current?.focus();
  };

  const nextBookable = () => dispatch({ type: Types.nextBookable });

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
            className={i === bookableIndex ? "selected" : undefined}
          >
            <button className="btn" onClick={() => changeBookable(i)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          autoFocus
          ref={nextButtonRef}
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
