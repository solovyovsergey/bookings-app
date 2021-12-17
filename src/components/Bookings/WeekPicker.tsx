import { useRef } from "react";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";
import { Actions, Types } from "./weekReducer";

type WeekPickerProps = { dispatch: React.Dispatch<Actions> };

const WeekPicker = ({ dispatch }: WeekPickerProps) => {
  const textboxRef = useRef<HTMLInputElement>(null);

  const goToDate = () => {
    dispatch({
      type: Types.setDate,
      payload: textboxRef.current?.value || "",
    });
  };

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({ type: Types.prevWeek })}
        >
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: Types.today })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            ref={textboxRef}
            placeholder="e.g. 2020-09-02"
            defaultValue="2020-06-24"
          />

          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button
          className="btn"
          onClick={() => dispatch({ type: Types.nextWeek })}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
    </div>
  );
};

export default WeekPicker;
