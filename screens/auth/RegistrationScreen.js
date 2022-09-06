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
import { authRegister } from "../../redux/auth/authOperations";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState(initialFormData);
  const [keyboardShown, setKeyboardShown] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
    dispatch(authRegister(formData));
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
                <Text style={styles.title}>Регистрация</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Имя"
                  onFocus={() => setKeyboardShown(true)}
                  value={formData.name}
                  onChangeText={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      name: value,
                    }))
                  }
                />
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
                  secureTextEntry={true}
                  onFocus={() => setKeyboardShown(true)}
                  value={formData.password}
                  onChangeText={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      password: value,
                    }))
                  }
                />
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 16 }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.navigationTitle}>
                      Уже есть аккаунт? Войти
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
