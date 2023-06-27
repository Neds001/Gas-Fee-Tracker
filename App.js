import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
import Notifications from './screens/Notifications';
import Settings from './screens/Settings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options = {{headerShown: false}} name="Dashboard" component={Dashboard} />
          <Stack.Screen options = {{headerShown: false}} name="Settings" component={Settings} />
          <Stack.Screen options = {{headerShown: false}} name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
