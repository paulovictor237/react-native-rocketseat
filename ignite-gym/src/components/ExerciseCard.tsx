import { Entypo } from "@expo/vector-icons";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {};

export const ExerciseCard = ({ ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        mb={3}
        bg="gray.500"
        rounded="md"
        alignItems="center"
        p={2}
        pr={4}
      >
        <Image
          source={{
            uri: "https://files.passeidireto.com/7dceacb9-8013-4e9c-b30b-dd174f2e525d/7dceacb9-8013-4e9c-b30b-dd174f2e525d.jpeg",
          }}
          alt="Imagem do execicio"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remade unilateral
          </Heading>
          <Text fontSize="lg" color="gray.200" mt={1} numberOfLines={2}>
            3 series x 12 repeticoes
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};
