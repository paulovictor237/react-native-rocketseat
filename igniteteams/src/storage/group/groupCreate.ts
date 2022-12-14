import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheKey } from "@storage/StorageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export const groupCreate = async (newGroupName: string) => {
  try {
    const storedGroups = await groupsGetAll();
    const groupAlreadyExists = storedGroups.includes(newGroupName);
    if (groupAlreadyExists) {
      throw new AppError("Já existe um turma cadastrado com esse nome.");
    }
    const storage = JSON.stringify([...storedGroups, newGroupName]);
    await AsyncStorage.setItem(CacheKey.GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
};
