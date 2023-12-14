import { createContext, useContext, useEffect, useState } from "react";

//Create context
export const UserContext = createContext();

//Create context provider
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setTimeout(() => {
        setLoading(false);
      }, 3000);
  }, []);

  const logout = () => {
    console.log("logged out");
  };

  return <UserContext.Provider value={{ currentUser, logout, loading }}>{children}</UserContext.Provider>;
};

//Custom hook to read user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
