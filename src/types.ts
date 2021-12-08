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

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};
