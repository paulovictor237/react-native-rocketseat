import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
  return (
    <View className="flex-1 bg-gray-600">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
};
