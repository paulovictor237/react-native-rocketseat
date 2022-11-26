import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Imput } from "@components/Imput";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@theme/styles/theme";
import { UsersThree } from "phosphor-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const NewGroup = () => {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();
  const handleNew = () => {
    navigation.navigate("players", { group });
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
        <Imput placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </View>
    </SafeAreaView>
  );
};
