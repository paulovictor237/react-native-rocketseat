import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheKey } from "@storage/StorageConfig";
import { playerGetByGroup } from "./playerGetByGroup";

export const playerRemoveByGroup = async (
  playerName: string,
  group: string
) => {
  try {
    const storage = await playerGetByGroup(group);
    const filtered = storage.filter((p) => p.name !== playerName);
    const players = JSON.stringify(filtered);
    await AsyncStorage.setItem(
      `${CacheKey.PLAYER_COLLECTION}-${group}`,
      players
    );
  } catch (error) {
    throw error;
  }
};
