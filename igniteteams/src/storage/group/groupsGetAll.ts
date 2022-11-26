import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheKey } from "@storage/StorageConfig";

export const groupsGetAll = async () => {
  try {
    const storage = await AsyncStorage.getItem(CacheKey.GROUP_COLLECTION);
    const groups: string[] = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;
  }
};
