import UserPhotoDefault from "@assets/userPhotoDefault.png";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");
  const toast = useToast();

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        // base64: true,
      });
      if (photoSelected.canceled) return;
      if (!photoSelected?.assets[0]?.uri) return;
      const photo = photoSelected.assets[0].uri;
      const photoInfo = await FileSystem.getInfoAsync(photo);
      if (photoInfo.size && photoInfo.size / Math.pow(1024, 2) > 5) {
        return toast.show({
          title: "Essa imagem é muito grande.\nEscolha uma de até 5MB",
          placement: "top",
          bgColor: "red.500",
        });
      }
      setUserPhoto(photoSelected.assets[0].uri);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36,
        }}
      >
        <Center mt={6} px={10}>
          {photoIsLoading && (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          )}
          {!photoIsLoading && (
            <UserPhoto
              source={userPhoto ? { uri: userPhoto } : UserPhotoDefault}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="E-mail" bg="gray.600" isDisabled />

          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Alterar Senha
          </Heading>

          <Input secureTextEntry placeholder="Senha antiga" bg="gray.600" />
          <Input secureTextEntry placeholder="Nova senha" bg="gray.600" />
          <Input
            secureTextEntry
            placeholder="Confirme a nova senha"
            bg="gray.600"
          />
          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
};
