import { Button } from "@components/Button";
import ButtonIcon from "@components/Buttonicon";
import Filter from "@components/Filter";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Imput } from "@components/Imput";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Players = () => {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);
  const route = useRoute();
  const { group } = route.params as { group: string };

  return (
    <SafeAreaView className="flex-1 bg-gray-600 p-[24px]">
      <Header showBackButton />
      <HighLight title={group} subtitle="adicione a galerae separe os times " />
      <View className="w-full bg-gray-700 flex-row justify-between items-center rounded-sm">
        <Imput placeholder="nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time" />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" ButtonTypeStyleProps="SECONDARY" />
    </SafeAreaView>
  );
};

export default Players;
