import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";

const RootLayout = () => {
  const [loaded] = useFonts({ SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")});

  if (loaded === false) { return null }
  else { }

  return(
  <SafeAreaProvider>
    <StatusBar style="auto" />
    <Stack screenOptions={ {headerTitleStyle: {fontFamily: "SpaceMono"}, headerBackTitleStyle: {fontFamily: "SpaceMono"}}}>
      <Stack.Screen name="index" options={ {title: "Home"}}/>
      </Stack>
  </SafeAreaProvider>
  );
}
export default RootLayout;