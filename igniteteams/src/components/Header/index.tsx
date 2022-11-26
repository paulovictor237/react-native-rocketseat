import logoImg from "@assets/logo/logo.png";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@theme/styles/theme";
import { CaretLeft } from "phosphor-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

type Props = {
  showBackButton?: boolean;
};

export const Header = ({ showBackButton = false }: Props) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    // navigation.goBack();
    navigation.navigate("groups");
  };

  return (
    <View className="w-full flex-row justify-center items-center">
      {showBackButton && (
        <TouchableOpacity className="flex-1" onPress={handleGoBack}>
          <CaretLeft color={colors.white} size={32} />
        </TouchableOpacity>
      )}
      <Image className="w-[46px] h-[55px]" source={logoImg} />
    </View>
  );
};
