import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";

export function Exercise() {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const { params } = useRoute();
  const { exerciseId } = params as { exerciseId: string };

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possivel carregar os detalhes dos exercicios";
      toast.show({
        title: message,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    console.log("asd");

    try {
      setSendingRegister(true);
      await api.post("/history", {
        exercise_id: exerciseId,
      });
      toast.show({
        title: "Parabens! Exercicio registrado no seu histórico",
        placement: "top",
        bgColor: "green.700",
      });
      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possivel registrar o exercicio";
      toast.show({
        title: message,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  };

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading && <Loading />}
      {!isLoading && (
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden" borderRadius="lg">
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Nome do exercício"
              resizeMode="cover"
              rounded="lg"
              borderRadius="lg"
            />
          </Box>

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />

                <Text color="gray.200" ml="2">
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />

                <Text color="gray.200" ml="2">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
              onPress={handleExerciseHistoryRegister}
              isLoading={sendingRegister}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  );
}
