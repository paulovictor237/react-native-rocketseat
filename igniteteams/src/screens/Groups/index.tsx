import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([
    // "familia",
    // "frango",
    // "amigos",
  ]);

  return (
    <View className="flex-1 p-[24px] bg-gray-600">
      <Header />
      <HighLight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma" />
        )}
      />
      <Button title={"Criar nova Turma"} />
    </View>
  );
};
