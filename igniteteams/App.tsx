import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Groups } from "@screens/Groups";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  if (!fontsLoaded) return <ActivityIndicator />;
  return (
    <View className="flex-1">
      <Groups />
    </View>
  );
};

export default App;
