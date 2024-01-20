import { createContext, useContext, useEffect, useState } from "react";

//Create context
export const UserContext = createContext();

//Create context provider
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userContextLoading, setUserContextLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setUserContextLoading(false);
  }, []);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const UPDATE_USER = async (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userContextLoading,
        signUp,
        signIn,
        signOut,
        UPDATE_USER,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//Custom hook to read user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
