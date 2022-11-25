import { StyledComponent } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
};

export const HighLight = ({ title, subtitle }: Props) => {
  return (
    <View className="w-full my-[32px]">
      <Text className="text-center text-xl font-roboto-bold text-white">
        {title}
      </Text>
      <Text className="text-center text-md font-roboto text-gray-300">
        {subtitle}
      </Text>
    </View>
  );
};
