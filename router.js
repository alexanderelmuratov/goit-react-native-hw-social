import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/main/PostsScreen";
import CreatePostScreen from "./screens/main/CreatePostScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarStyle: {
          alignItems: "center",
        },
        tabBarItemStyle: {
          marginHorizontal: 30,
          marginTop: 2,
          marginBottom: 2,
          borderRadius: 20,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="grid-outline"
              size={focused ? 32 : 24}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          title: "Создать публикацию",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="arrow-back" size={36} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-outline"
              size={focused ? 40 : 32}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          ),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={focused ? 32 : 24}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
