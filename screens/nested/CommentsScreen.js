import { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const { postId, photo, title, allComments } = route.params;

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(allComments || []);
  const [keyboardShown, setKeyboardShown] = useState(false);

  const { name, avatar } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    const createdAt = new Date();
    newComment.trim() &&
      (await db
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          comments: [
            ...comments,
            {
              newComment,
              name,
              avatar,
              createdAt: createdAt.toLocaleString(),
            },
          ],
        }));

    const data = await db.firestore().collection("posts").doc(postId).get();
    setComments(data.data().comments);

    keyboardHide();
    setNewComment("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.postImageContainer}>
          <Image style={styles.postImage} source={{ uri: photo }} />
          <View style={{ marginTop: 8 }}>
            <Text style={styles.postImageTitle}>{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {comments && (
        <SafeAreaView style={styles.commentsListContainer}>
          <FlatList
            data={comments}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <View style={styles.avatarContainer}>
                  <ImageBackground
                    style={styles.avatar}
                    source={require("../../assets/images/default-avatar.jpg")}
                  >
                    {item.avatar && (
                      <Image
                        style={styles.avatar}
                        source={{ uri: item.avatar }}
                      />
                    )}
                  </ImageBackground>
                </View>
                <View style={styles.comment}>
                  <Text style={styles.commentAuthor}>{item.name}</Text>
                  <Text style={styles.commentMessage}>{item.newComment}</Text>
                  <Text style={styles.commentDate}>{item.createdAt}</Text>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
      )}
      <View
        style={{
          ...styles.inputWrapper,
          marginBottom: keyboardShown ? 100 : 10,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Комментировать..."
          onFocus={() => setKeyboardShown(true)}
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity
          style={styles.addCommentButton}
          activeOpacity={0.8}
          onPress={createComment}
        >
          <AntDesign name="arrowup" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  postImageContainer: {
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
  commentsListContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    overflow: "hidden",
    borderRadius: 50,
    marginRight: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 50,
  },
  comment: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 8,
  },
  commentAuthor: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },
  commentMessage: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    textAlign: "right",
    color: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
    marginHorizontal: 16,
  },
  input: {
    justifyContent: "center",
    height: 50,
    paddingLeft: 16,
    paddingRight: 60,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  addCommentButton: {
    position: "absolute",
    right: 10,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
