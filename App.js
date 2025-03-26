import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ReimbursementsPage from "./src/pages/ReimbursementsPage";
import CreateClaimPage from "./src/pages/CreateClaimPage";
import * as React from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ReimbursementsPage" component={ReimbursementsPage} />
        <Stack.Screen name="CreateClaim" component={CreateClaimPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}