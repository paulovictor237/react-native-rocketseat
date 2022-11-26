import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheKey } from "@storage/StorageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export const groupRemoveByName = async (groupDeleted: string) => {
  try {
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter((p) => p !== groupDeleted);
    const storage = JSON.stringify(groups);
    await AsyncStorage.setItem(CacheKey.GROUP_COLLECTION, storage);
    await AsyncStorage.removeItem(
      `${CacheKey.PLAYER_COLLECTION}-${groupDeleted}`
    );
  } catch (error) {
    throw error;
  }
};
