import { ActionMap, Bookable } from "../../types";
import { Reducer } from "react";

type Group = string;
type BookableIndex = number;
type Bookables = Bookable[];

export interface State {
  group: Group;
  bookableIndex: BookableIndex;
  bookables: Bookables;
  isLoading: boolean;
  error: Error | null;
}

export enum Types {
  setGroup = "SET_GROUP",
  setBookable = "SET_BOOKABLE",
  nextBookable = "NEXT_BOOKABLE",
  fetchBookablesRequest = "FETCH_BOOKABLES_REQUEST",
  fetchBookablesSuccess = "FETCH_BOOKABLES_SUCCESS",
  fetchBookablesError = "FETCH_BOOKABLES_ERROR",
}

type Payload = {
  [Types.setGroup]: { group: Group; bookableIndex: BookableIndex };
  [Types.setBookable]: BookableIndex;
  [Types.nextBookable]: undefined;
  [Types.fetchBookablesRequest]: undefined;
  [Types.fetchBookablesSuccess]: Bookables;
  [Types.fetchBookablesError]: Error;
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const initialState: State = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  error: null,
};

export const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case Types.setGroup:
      return { ...state, ...action.payload };
    case Types.setBookable:
      return { ...state, bookableIndex: action.payload };
    case Types.nextBookable:
      const count = state.bookables.filter(
        (b) => b.group === state.group
      ).length;

      return { ...state, bookableIndex: (state.bookableIndex + 1) % count };

    case Types.fetchBookablesRequest:
      return { ...state, isLoading: true, error: null, bookables: [] };
    case Types.fetchBookablesSuccess:
      return { ...state, isLoading: false, bookables: action.payload };
    case Types.fetchBookablesError:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
