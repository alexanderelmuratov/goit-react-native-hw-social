import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { EvilIcons } from "@expo/vector-icons";
import db from "../../firebase/config";
import { authLogout } from "../../redux/auth/authOperations";

export default function UserScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const { userId, name, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => dispatch(authLogout());

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setPosts(
          data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        )
      );
  };

  const deletePost = async (postId, url) => {
    await db.firestore().collection("posts").doc(postId).delete();
    await db.storage().refFromURL(url).delete();
  };

  const createLike = async (postId) => {
    const data = await db.firestore().collection("posts").doc(postId).get();
    const { likes } = data.data();
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({ likes: (likes ? likes : 0) + 1 });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/nature.jpg")}
      >
        <View style={styles.profileWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Entypo name="log-out" size={30} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.profileNameWrapper}>
            <Text style={styles.profileName}>{name}</Text>
          </View>
          <View style={styles.profileEmailWrapper}>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <TouchableOpacity
                  style={styles.deletePostButton}
                  onPress={() => deletePost(item.id, item.photo)}
                >
                  <MaterialIcons name="close" size={26} color="#BDBDBD" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      photo: item.photo,
                      title: item.title,
                      allComments: item.comments,
                    })
                  }
                >
                  <Image
                    style={styles.postImage}
                    source={{ uri: item.photo }}
                  />
                </TouchableOpacity>
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.postImageTitle}>{item.title}</Text>
                </View>
                <View style={styles.postInfoContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ ...styles.postInfoButton, marginRight: 24 }}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          photo: item.photo,
                          title: item.title,
                          allComments: item.comments,
                        })
                      }
                    >
                      <EvilIcons
                        name="comment"
                        size={32}
                        color={item.comments?.length ? "#FF6C00" : "#BDBDBD"}
                      />
                      <Text style={styles.postInfoText}>
                        {item.comments?.length || 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.postInfoButton}
                      activeOpacity={0.8}
                      onPress={() => createLike(item.id)}
                    >
                      <EvilIcons
                        name="like"
                        size={36}
                        color={item.likes ? "#FF6C00" : "#BDBDBD"}
                      />
                      <Text style={styles.postInfoText}>{item.likes || 0}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.postInfoButton}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item.location,
                      })
                    }
                  >
                    <EvilIcons name="location" size={32} color="#BDBDBD" />
                    <Text style={styles.postInfoText}>
                      {item.address &&
                        `${item.address?.city}, ${item.address?.country}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
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
  profileWrapper: {
    height: 660,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileNameWrapper: {
    marginTop: 60,
    marginBottom: 5,
  },
  profileName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
  },
  profileEmailWrapper: {
    marginBottom: 32,
  },
  profileEmail: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    color: "#BDBDBD",
    textAlign: "center",
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  deletePostButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    opacity: 0.5,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
  postImageTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  postInfoContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postInfoButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  postInfoText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
});
