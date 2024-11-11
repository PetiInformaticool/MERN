import { createContext } from "react";

export const AppContext = createContext({
  removeItem: () => {},
  changeName: () => {},
});

 