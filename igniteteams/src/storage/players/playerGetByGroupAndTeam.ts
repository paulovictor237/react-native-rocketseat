import { playerGetByGroup } from "./playerGetByGroup";

export const playerGetByGroupAndTeam = async (group: string, team: string) => {
  try {
    const storage = await playerGetByGroup(group);
    const players = storage.filter((p) => p.team === team);
    return players;
  } catch (error) {
    console.error(error);
    return [];
  }
};
