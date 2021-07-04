import { createContext, SetStateAction, Dispatch } from "react";

const LanguageContext = createContext<[any, Dispatch<SetStateAction<string>>]>([
  null as any,
  language => language
]);

export default LanguageContext;
