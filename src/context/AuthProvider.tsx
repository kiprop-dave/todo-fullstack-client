import { createContext, useState, useEffect } from "react";
import { responseData } from "../types/types";

interface ContextInterface {
  auth: responseData;
  setAuth: (data: responseData) => void;
}
const AuthContext = createContext<ContextInterface | null>(null);

type contextProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: contextProps) => {
  const [auth, setAuth] = useState<responseData>({ message: "", email: "" });
  // console.log(auth);

  const authenticate = (data: responseData) => {
    setAuth(data);
  };
  const values: ContextInterface = {
    setAuth: authenticate,
    auth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
