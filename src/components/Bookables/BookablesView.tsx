import { useReducer } from "react";
import { BookableDetails } from "./BookableDetails";
import BookablesList from "./BookablesList";
import { initialState, reducer } from "./reducer";

export const BookablesView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  return (
    <>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </>
  );
};
