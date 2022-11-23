// import React from "react";
// import { StatusBar } from "react-native";
// import { Home } from "./src/Screens/Home";

// export default function App() {
//   return (
//     <>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor="#000"
//         translucent={false}
//       />
//       <Home />
//     </>
//   );
// }

import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

// https://www.nativewind.dev/quick-starts/expo

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-600">
      <Text className="text-black font-bold text-2xl">PEVE</Text>
      <Text className="text-red-500 font-bold text-lg">I ❤️ Tailwind</Text>
      <Text className="text-white">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
