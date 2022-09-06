import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import UserScreen from "../nested/UserScreen";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";

const NestedStack = createStackNavigator();

export default function ProfileScreen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
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
