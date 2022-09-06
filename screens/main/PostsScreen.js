import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../nested/HomeScreen";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";

import { authLogout } from "../../redux/auth/authOperations";

const NestedStack = createStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();

  const logout = () => dispatch(authLogout());

  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Публикации",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Entypo name="log-out" size={30} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Комментарии",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={36} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        })}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Карта",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={36} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        })}
      />
    </NestedStack.Navigator>
  );
}
