"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContextData, IChildrenProps, IUserData } from "../../@types";
import { localStorageUtils } from "../../utils";

const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorageUtils.getItem("user");
    const storedToken = localStorageUtils.getItem("token");
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSetUser = (newUser: IUserData | null) => {
    setUser(newUser);
    if (newUser) {
      localStorageUtils.setItem("user", newUser);
    } else {
      localStorageUtils.removeItem("user");
    }
  };

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorageUtils.setItem("token", newToken);
    } else {
      localStorageUtils.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser: handleSetUser, setToken: handleSetToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
