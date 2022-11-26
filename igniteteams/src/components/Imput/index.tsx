import { colors } from "@theme/styles/theme";
import React, { RefObject } from "react";
import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  inputRef?: RefObject<TextInput>;
};

export const Input = ({ inputRef, ...rest }: Props) => {
  return (
    <TextInput
      ref={inputRef}
      className="flex-1 min-h-[56px] max-h-[56px] bg-gray-700 font-roboto text-md text-white rounded-md px-[16px]"
      placeholderTextColor={colors["gray-300"]}
      {...rest}
    />
  );
};
