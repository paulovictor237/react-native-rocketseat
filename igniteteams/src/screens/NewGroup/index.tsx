import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Imput } from "@components/Imput";
import { colors } from "@theme/styles/theme";
import { UsersThree } from "phosphor-react-native";
import React from "react";
import { Text, View } from "react-native";

export const NewGroup = () => {
  return (
    <View className="flex-1 bg-gray-600 p-[24px]">
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
        <Imput placeholder="Nome da turma" />
        <Button title="Criar" style={{ marginTop: 20 }} />
      </View>
    </View>
  );
};
