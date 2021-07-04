import { createContext, SetStateAction, Dispatch } from "react";

const LoaderContext = createContext<[any, Dispatch<SetStateAction<boolean>>]>([
  null as any,
  loading => loading
]);

export default LoaderContext;
