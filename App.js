import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute({});

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync(customFonts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    };
    loadFonts();
  }, []);

  if (!isReady) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
