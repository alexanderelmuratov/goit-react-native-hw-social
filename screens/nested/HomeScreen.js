import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";

export default function HomeScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
      console.log("posts", posts);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        // style={{ marginTop: 32 }}
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image style={styles.postImage} source={{ uri: item.photo }} />
          </View>
        )}
      />
      <Button title="Go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="Go to Comments"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  postContainer: {
    // height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    // borderRadius: 8,
    // justifyContent: "center",
    // alignItems: "center",
  },
  postImage: {
    height: 240,
    borderRadius: 8,
  },
});
