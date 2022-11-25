import { colors } from "@theme/styles/theme";
import { UsersThree } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export const GroupCard = ({ title, ...rest }: Props) => {
  return (
    <TouchableOpacity
      className="w-full h-[90px] bg-gray-500 rounded-md p-[24px] mb-[12px] flex-row items-center"
      {...rest}
    >
      <UsersThree
        weight="fill"
        size={32}
        color={colors["green-700"]}
        // @ts-ignore
        className="mr-[20px]"
      />
      <Text className="text-md text-gray-200 font-roboto">{title}</Text>
    </TouchableOpacity>
  );
};
