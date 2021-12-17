export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};
export interface Bookable {
  id: number;
  group: string;
  title: string;
  notes: string;
  sessions: number[];
  days: number[];
}

export interface User {
  id: number;
  name: string;
  img: string;
  title: string;
  notes: string;
}

export interface Booking {
  session: string;
  date: string;
  bookableId: number;
  title: string;
  bookerId: number;
  id: number;
  notes?: string;
}

export type Grid = Record<
  string,
  Record<
    string,
    {
      session: string;
      date: string;
      bookableId: number;
      title: string;
    }
  >
>;
