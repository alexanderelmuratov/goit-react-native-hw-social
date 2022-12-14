import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { authLogin } from "../../redux/auth/authOperations";

const initialFormData = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState(initialFormData);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const dispatch = useDispatch();

  const toggleSecureEntry = () => setIsSecureEntry(!isSecureEntry);

  const handleSubmit = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
    dispatch(authLogin(formData));
    setFormData(initialFormData);
  };

  const keyboardHide = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../assets/images/nature.jpg")}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View style={styles.formWrapper}>
              <View
                style={{
                  ...styles.form,
                  marginBottom: keyboardShown ? 32 : 78,
                }}
              >
                <Text style={styles.title}>Войти</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Адрес электронной почты"
                    onFocus={() => setKeyboardShown(true)}
                    value={formData.email}
                    onChangeText={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        email: value,
                      }))
                    }
                  />
                  <TextInput
                    style={{ ...styles.input, marginBottom: 0 }}
                    placeholder="Пароль"
                    secureTextEntry={isSecureEntry}
                    onFocus={() => setKeyboardShown(true)}
                    value={formData.password}
                    onChangeText={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        password: value,
                      }))
                    }
                  />
                  {formData.password && (
                    <TouchableOpacity
                      style={styles.secureButton}
                      activeOpacity={0.8}
                      onPress={toggleSecureEntry}
                    >
                      {isSecureEntry ? (
                        <Ionicons name="eye" size={30} color="#BDBDBD" />
                      ) : (
                        <Ionicons name="eye-off" size={30} color="#BDBDBD" />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonTitle}>Войти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 16 }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.navigationTitle}>
                      Нет аккаунта? Зарегистрироваться
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#212121",
  },
  formWrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 16,
    paddingTop: 32,
  },
  input: {
    height: 50,
    paddingLeft: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  secureButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 43,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  navigationTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
