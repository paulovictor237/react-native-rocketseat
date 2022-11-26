import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Groups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const storage = await groupsGetAll();
      setGroups(storage);
    } catch (error) {
      console.error(error);
      Alert.alert("Turmas", "Não foi possivel carregar as turmas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );
  // useEffect(() => {
  //   fetchGroups();
  // }, [groups]);

  return (
    <SafeAreaView className="flex-1 p-[24px] bg-gray-600">
      <Header />
      <HighLight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading && <Loading />}
      {!isLoading && (
        <FlatList
          data={groups}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title={"Criar nova Turma"} onPress={handleNewGroup} />
    </SafeAreaView>
  );
};
