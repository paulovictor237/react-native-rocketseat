import { IImageProps, Image } from "native-base";
import React from "react";
import { Text, View } from "react-native";

type Props = IImageProps & {
  size: number;
};

export const UserPhoto = ({ size, ...rest }: Props) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
};
