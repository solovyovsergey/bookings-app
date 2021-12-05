import { Reducer } from "react";
import { ActionMap } from "../../types";
import { getWeek } from "../../utils/date-wrangler";

type State = {
  date: Date;
  start: Date;
  end: Date;
};

export enum Types {
  nextWeek = "NEXT_WEEK",
  prevWeek = "PREV_WEEK",
  today = "TODAY",
  setDate = "SET_DATE",
}

type Payload = {
  [Types.nextWeek]: undefined;
  [Types.prevWeek]: undefined;
  [Types.today]: undefined;
  [Types.setDate]: number;
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case Types.nextWeek:
      return getWeek(state.date, 7);
    case Types.prevWeek:
      return getWeek(state.date, -7);
    case Types.today:
      return getWeek(new Date());
    case Types.setDate:
      return getWeek(new Date(action.payload));
    default:
      return state;
  }
};
