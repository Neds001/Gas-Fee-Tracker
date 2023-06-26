import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
import BnbGas from './screens/BnbGas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options = {{headerShown: false}} name="Dashboard" component={Dashboard} />
          <Stack.Screen options = {{headerShown: false}} name="BnbGas" component={BnbGas} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
