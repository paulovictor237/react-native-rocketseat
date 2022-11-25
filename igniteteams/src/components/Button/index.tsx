import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type TypeStyle = "PRIMARY" | "SECONDARY";
type Props = TouchableOpacityProps & {
  title: string;
  ButtonTypeStyleProps?: TypeStyle;
};

export const Button = ({
  title,
  ButtonTypeStyleProps = "PRIMARY",
  ...rest
}: Props) => {
  const TypeStyle: { [key in TypeStyle]: string } = {
    PRIMARY: "bg-green-700",
    SECONDARY: "bg-red-dark",
  };

  return (
    <TouchableOpacity
      className={`flex-1 min-h-[56] max-h-[56] rounded-sm justify-center items-center 
        ${TypeStyle[ButtonTypeStyleProps]}
      `}
      {...rest}
    >
      <Text className="text-md text-white font-roboto">{title}</Text>
    </TouchableOpacity>
  );
};
