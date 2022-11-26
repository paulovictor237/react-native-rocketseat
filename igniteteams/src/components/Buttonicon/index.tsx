import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@theme/styles/theme";
import { IconProps } from "phosphor-react-native";
import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type TypeStyle = "PRIMARY" | "SECONDARY";
type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: TypeStyle;
};

const ButtonIcon = ({ icon, type = "PRIMARY", ...rest }: Props) => {
  const ButtonStyle: { [key in TypeStyle]: string } = {
    PRIMARY: colors["green-700"],
    SECONDARY: colors["red"],
  };
  return (
    <TouchableOpacity
      className="h-[56px] w-[56px] justify-center items-center rounded-md ml-[12px]"
      {...rest}
    >
      <MaterialIcons name={icon} color={ButtonStyle[type]} size={24} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
