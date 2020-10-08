import { createContext, SetStateAction, Dispatch } from "react";

const UserContext = createContext<[any, Dispatch<SetStateAction<any>>]>([
  null as any,
  user => user
]);

export default UserContext;
