import ButtonIcon from "@components/Buttonicon";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@theme/styles/theme";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  name: string;
  onRemove: () => void;
};

export const PlayerCard = ({ name, onRemove }: Props) => {
  return (
    <View className="w-full h-[56px] bg-gray-500 flex-row items-center mb-[16px] rounded-md">
      <MaterialIcons
        name="person"
        size={24}
        color={colors["gray-200"]}
        className="ml-[16px] mr-[4px]"
        style={{ marginLeft: 16, marginRight: 4 }}
      />
      <Text className="flex-1 text-md text-gray-200 font-roboto">{name}</Text>

      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </View>
  );
};
