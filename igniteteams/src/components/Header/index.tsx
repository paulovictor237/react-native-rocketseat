import logoImg from "@assets/logo/logo.png";
import React from "react";
import { Image, View } from "react-native";

export const Header = () => {
  return (
    <View className="w-full flex-row justify-center items-center">
      <Image className="w-[46px] h-[55px]" source={logoImg} />
    </View>
  );
};
