import { colors } from "@theme/styles/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";
// import colors from "tailwindcss/colors";

export const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-600">
      <ActivityIndicator className="" color={colors["green-700"]} />
    </View>
  );
};
