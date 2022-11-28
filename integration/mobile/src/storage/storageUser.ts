import { UserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageConfig } from "./storageConfig";

export const storageUserSave = async (user: UserDTO) => {
  await AsyncStorage.setItem(StorageConfig.USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async () => {
  const storage = await AsyncStorage.getItem(StorageConfig.USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};
  return user;
};

export const storageUserRemove = async () => {
  await AsyncStorage.removeItem(StorageConfig.USER_STORAGE);
};
