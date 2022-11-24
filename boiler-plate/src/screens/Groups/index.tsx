import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export const Groups = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-green-500 text-4xl font-bold">Hello World !!</Text>
      <StatusBar style="auto" />
    </View>
  );
};
