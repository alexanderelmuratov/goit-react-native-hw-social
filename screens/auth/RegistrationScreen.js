import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import db from "../../firebase/config";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  authRegister,
  authAvatarChange,
} from "../../redux/auth/authOperations";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState(initialFormData);
  const [avatar, setAvatar] = useState(null);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const dispatch = useDispatch();

  const toggleSecureEntry = () => setIsSecureEntry(!isSecureEntry);

  const handleSubmit = async () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
    dispatch(authRegister(formData));
    setFormData(initialFormData);

    if (avatar) {
      const avatarUri = await uploadAvatarToServer(avatar);
      dispatch(authAvatarChange(avatarUri));
    }
  };

  const keyboardHide = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const uploadAvatarToServer = async (photo) => {
    const response = await fetch(photo);
    const file = await response.blob();
    const avatarId = Date.now().toString();
    await db.storage().ref(`avatars/${avatarId}`).put(file);

    const processedAvatar = await db
      .storage()
      .ref("avatars")
      .child(avatarId)
      .getDownloadURL();
    return processedAvatar;
  };

  const deleteAvatar = async () => {
    setAvatar(null);
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
                <View style={styles.avatarWrapper}>
                  <View style={{ overflow: "hidden", borderRadius: 16 }}>
                    <ImageBackground
                      style={styles.avatar}
                      source={require("../../assets/images/default-avatar.jpg")}
                    >
                      {avatar && (
                        <Image style={styles.avatar} source={{ uri: avatar }} />
                      )}
                    </ImageBackground>
                  </View>
                  {avatar ? (
                    <TouchableOpacity
                      style={{ ...styles.avatarButton, borderColor: "#BDBDBD" }}
                      onPress={deleteAvatar}
                    >
                      <MaterialIcons name="close" size={26} color="#BDBDBD" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.avatarButton}
                      onPress={pickAvatar}
                    >
                      <MaterialIcons name="add" size={26} color="#FF6C00" />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.title}>Регистрация</Text>
                <View style={{ position: "relative" }}>
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
  avatarWrapper: {
    position: "absolute",
    alignSelf: "center",
    top: -60,
    zIndex: 100,
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  avatarButton: {
    position: "absolute",
    bottom: 10,
    right: -16,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF6C00",
    borderRadius: 50,
  },
  form: {
    marginHorizontal: 16,
    paddingTop: 80,
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
