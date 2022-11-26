import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isActive?: boolean;
};

const Filter = ({ title, isActive = false, ...rest }: Props) => {
  return (
    <TouchableOpacity
      className={`rounded-sm mr-3 h-[38px] w-[70px] items-center justify-center
        ${isActive && "border-2 border-green-700"}
      `}
      {...rest}
    >
      <Text className="font-roboto text-sm text-white uppercase">{title}</Text>
    </TouchableOpacity>
  );
};

export default Filter;
