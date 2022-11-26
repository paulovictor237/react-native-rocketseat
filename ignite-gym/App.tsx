import { Loading } from "@components/Loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { SignIn } from "@screens/signin";
import { SignUp } from "@screens/signup";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded && <Loading />}
      {/* {fontsLoaded && <SignIn />} */}
      {fontsLoaded && <SignUp />}
    </NativeBaseProvider>
  );
}
