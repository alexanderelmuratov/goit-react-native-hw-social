import { StyleSheet, Text, View } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#212121",
  },
});
