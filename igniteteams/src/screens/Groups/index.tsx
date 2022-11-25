import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export const Groups = () => {
  return (
    <View className="flex-1 p-[24px] bg-gray-600">
      <Header />
      <HighLight title="Turmas" subtitle="jogue com a sua turma" />
    </View>
  );
};
