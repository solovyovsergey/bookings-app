import { sessions, days } from "../../static.json";
import { ChangeEvent, useReducer } from "react";
import { FaArrowRight } from "react-icons/fa";
import { initialState, reducer, Types } from "./reducer";

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, hasDetails, bookables } = state;

  const groups = Array.from(new Set(bookables.map((b) => b.group)));
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];

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
  };

  const toggleDetails = () => {
    dispatch({ type: Types.toggleHasDetails });
  };

  const nextBookable = () => dispatch({ type: Types.nextBookable });

  return (
    <>
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
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
