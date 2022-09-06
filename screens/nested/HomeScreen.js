import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import db from "../../firebase/config";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(
          data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        )
      );
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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
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
              <Image style={styles.postImage} source={{ uri: item.photo }} />
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
                  {`${item.address?.city}, ${item.address?.country}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
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
