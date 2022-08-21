import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CreatePostsScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
      // console.log("location", location);
    })();
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    if (!camera) return;
    try {
      const photo = await camera.takePictureAsync();
      // const location = await Location.getCurrentPositionAsync();
      // console.log("photo", photo);
      // console.log("location", location);
      await MediaLibrary.createAssetAsync(photo.uri);
      setPhoto(photo.uri);
      // setLocation(location);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPhoto = () => {
    if (!photo) return;
    navigation.navigate("Home", { photo });
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        {photo && location && (
          <View style={styles.photoContainer}>
            <Image
              style={{ width: 170, height: 100 }}
              source={{ uri: photo }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.cameraTypeButton}
          onPress={toggleCameraType}
        >
          {type === CameraType.back ? (
            <MaterialIcons name="camera-front" size={32} color="#BDBDBD" />
          ) : (
            <MaterialIcons name="camera-rear" size={32} color="#BDBDBD" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraSnapButton} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity
          style={styles.sendButton}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.sendButtonTitle}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    position: "relative",
    height: 440,
    marginHorizontal: 16,
    marginTop: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraTypeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    // marginTop: -30,
    // marginLeft: -30,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    // backgroundColor: "#FFFFFF",
    borderRadius: 50,
    opacity: 0.5,
  },
  cameraSnapButton: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // marginTop: -30,
    // marginLeft: -30,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    opacity: 0.5,
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    // marginHorizontal: 16,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 16,
    marginTop: 180,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  sendButtonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
});
