import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ReimbursementsPage from "./src/pages/ReimbursementsPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ReimbursementsPage" component={ReimbursementsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}