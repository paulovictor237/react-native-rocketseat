import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([
    // "familia",
    // "frango",
    // "amigos",
  ]);
  const navigation = useNavigation();
  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  return (
    <SafeAreaView className="flex-1 p-[24px] bg-gray-600">
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
        showsVerticalScrollIndicator={false}
      />
      <Button title={"Criar nova Turma"} onPress={handleNewGroup} />
    </SafeAreaView>
  );
};
