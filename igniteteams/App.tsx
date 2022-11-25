import { Loading } from "@components/Loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Groups } from "@screens/Groups";
import React from "react";
import { StatusBar } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  if (!fontsLoaded) return <Loading />;
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Groups />
    </>
  );
};

export default App;
