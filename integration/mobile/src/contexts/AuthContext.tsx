import { UserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/torageAuthToken";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
  isLoadingUserStorage: boolean;
  user: UserDTO;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  const userAndTokenUpdate = (user: UserDTO, token: string) => {
    api.defaults.headers.common["Authorization"] = `bearer ${token}`;
    setUser(user);
  };

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorage(true);
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  };

  const updateUserProfile = async (userUpdate: UserDTO) => {
    try {
      setUser(userUpdate);
      await storageUserSave(userUpdate);
    } catch (error) {
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorage(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();
      if (!!userLogged?.id && !!token) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signOut, user, signIn, isLoadingUserStorage, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
