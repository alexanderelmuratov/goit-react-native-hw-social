import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../nested/HomeScreen";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";

const NestedStack = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="Home" component={HomeScreen} />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
}
