import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheKey } from "@storage/StorageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const playerGetByGroup = async (group: string) => {
  try {
    const storage = await AsyncStorage.getItem(
      `${CacheKey.PLAYER_COLLECTION}-${group}`
    );
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
    return players;
  } catch (error) {
    throw error;
  }
};
