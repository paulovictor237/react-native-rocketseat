import { UserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageConfig } from "./storageConfig";

export const storageAuthTokenSave = async (token: string) => {
  await AsyncStorage.setItem(StorageConfig.AUTH_TOKEN_STORAGE, token);
};

export const storageAuthTokenGet = async () => {
  const token = await AsyncStorage.getItem(StorageConfig.AUTH_TOKEN_STORAGE);
  return token;
};

export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(StorageConfig.AUTH_TOKEN_STORAGE);
};
