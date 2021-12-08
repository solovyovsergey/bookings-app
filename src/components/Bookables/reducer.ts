import { ActionMap, Bookable } from "../../types";
import { Reducer } from "react";

type Group = string;
type BookableIndex = number;
type HasDetails = boolean;
type Bookables = Bookable[];

interface State {
  group: Group;
  bookableIndex: BookableIndex;
  hasDetails: HasDetails;
  bookables: Bookables;
  isLoading: boolean;
  error: Error | null;
}

export enum Types {
  setGroup = "SET_GROUP",
  setBookable = "SET_BOOKABLE",
  toggleHasDetails = "TOGGLE_HAS_DETAILS",
  nextBookable = "NEXT_BOOKABLE",
  fetchBookablesRequest = "FETCH_BOOKABLES_REQUEST",
  fetchBookablesSuccess = "FETCH_BOOKABLES_SUCCESS",
  fetchBookablesError = "FETCH_BOOKABLES_ERROR",
}

type Payload = {
  [Types.setGroup]: { group: Group; bookableIndex: BookableIndex };
  [Types.setBookable]: BookableIndex;
  [Types.toggleHasDetails]: undefined;
  [Types.nextBookable]: undefined;
  [Types.fetchBookablesRequest]: undefined;
  [Types.fetchBookablesSuccess]: Bookables;
  [Types.fetchBookablesError]: Error;
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const initialState: State = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
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
    case Types.toggleHasDetails:
      return { ...state, hasDetails: !state.hasDetails };
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
