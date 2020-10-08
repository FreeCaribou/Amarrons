import { createContext, SetStateAction, Dispatch } from "react";

const ErrorMessageContext = createContext<[any, Dispatch<SetStateAction<any>>]>([
  null as any,
  error => error
]);

export default ErrorMessageContext;
