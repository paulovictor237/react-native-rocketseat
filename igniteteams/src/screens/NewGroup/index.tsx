import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Imput } from "@components/Imput";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { colors } from "@theme/styles/theme";
import { AppError } from "@utils/AppError";
import { UsersThree } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const NewGroup = () => {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();
  const handleNew = async () => {
    setGroup((p) => p.trim());
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma");
      }
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possivel criar um novo grupo");
        console.error(error);
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-600 p-[24px]">
      <Header showBackButton />

      <View className="flex-1 justify-center">
        <UsersThree
          size={56}
          color={colors["green-700"]}
          // @ts-ignore
          className="self-center"
        />
        <HighLight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Imput
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </View>
    </SafeAreaView>
  );
};
