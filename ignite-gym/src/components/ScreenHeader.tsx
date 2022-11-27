import { Center, Heading, Text } from "native-base";
import React from "react";

type Props = {
  title: string;
};

export const ScreenHeader = ({ title }: Props) => {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {title}
      </Heading>
    </Center>
  );
};
