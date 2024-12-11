import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./(tabs)/profile"; // Corrected to match the component name
import OrdersPage from "@/components/OrdersPage"; // Ensure this path is correct

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="OrdersPage" component={OrdersPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
