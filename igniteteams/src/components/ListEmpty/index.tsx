import React from "react";
import { Text, View } from "react-native";

type props = {
  message: string;
};

export const ListEmpty = ({ message }: props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center text-sm font-roboto text-gray-300">
        {message}
      </Text>
    </View>
  );
};
