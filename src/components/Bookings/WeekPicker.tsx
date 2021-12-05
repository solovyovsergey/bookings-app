import { useReducer } from "react";
import { getWeek } from "../../utils/date-wrangler";
import { FaChevronLeft, FaCalendarDay, FaChevronRight } from "react-icons/fa";
import { reducer, Types } from "./reducer";

const WeekPicker: React.FC<{ date: Date }> = ({ date }) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek);

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

        <button
          className="btn"
          onClick={() => dispatch({ type: Types.nextWeek })}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;
