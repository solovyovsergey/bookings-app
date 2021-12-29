import { ReactNode, useState } from "react";
import { createCtx } from "../../context";
import { User } from "../../types";

const [useUserContext, UserProvider] = createCtx<User | null>();
const [useSetUserContext, SetUserProvider] =
  createCtx<(val: User | null) => void>();

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserProvider value={user}>
      <SetUserProvider value={setUser}>{children}</SetUserProvider>
    </UserProvider>
  );
};

export const useUser = () => {
  const user = useUserContext();
  const setUser = useSetUserContext();

  return [user, setUser] as const;
};
