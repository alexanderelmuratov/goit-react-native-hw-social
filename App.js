import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";
import { store } from "./redux/store";
import db from "./firebase/config";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  db.auth().onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);

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

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
