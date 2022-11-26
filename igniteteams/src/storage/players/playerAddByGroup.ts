import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheKey } from "@storage/StorageConfig";
import { AppError } from "@utils/AppError";
import { playerGetByGroup } from "./playerGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const playerAddByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string
) => {
  try {
    const storedPlayers = await playerGetByGroup(group);
    const playerAlreadyExists = storedPlayers.filter(
      (p) => p.name === newPlayer.name
    );
    if (playerAlreadyExists.length > 0) {
      throw new AppError("Já existe um jogador cadastrado com esse nome.");
    }
    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(
      `${CacheKey.PLAYER_COLLECTION}-${group}`,
      storage
    );
  } catch (error) {
    throw error;
  }
};
