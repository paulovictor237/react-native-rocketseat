import { Button } from "@components/Button";
import ButtonIcon from "@components/Buttonicon";
import Filter from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Input } from "@components/Imput";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as { group: string };

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar"
      );
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    };
    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova pessoa", error.message);
      } else {
        console.error(error);
        return Alert.alert("Nova pessoa", "Não foi possivel adicionar");
      }
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      setIsLoading(true);
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possivel carregar pessoas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log("error");
      Alert.alert("Remover pessoa", "não foi possivel remover essa pessoa");
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover turma", "Não foi possivel remover o turma");
    }
  };

  const handleGroupRemove = async () => {
    Alert.alert("Remover", "Deseeja remover o turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: groupRemove },
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <SafeAreaView className="flex-1 bg-gray-600 p-[24px]">
      <Header showBackButton />
      <HighLight
        title={group}
        subtitle="adicione a galera e separe as turmas"
      />
      <View className="w-full bg-gray-700 flex-row justify-between items-center rounded-sm">
        <Input
          placeholder="nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </View>

      <View className="w-full flex-row items-center justify-between mt-[32px] mb-[12px]">
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <Text className="text-gray-200 font-roboto-bold text-sm">
          {players.length}
        </Text>
      </View>

      {isLoading && <Loading />}
      {!isLoading && (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time" />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        ButtonTypeStyleProps="SECONDARY"
        onPress={handleGroupRemove}
      />
    </SafeAreaView>
  );
};

export default Players;
