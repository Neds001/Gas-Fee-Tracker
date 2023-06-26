import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EthereumGas from './screens/EthereumGas';
import BnbGas from './screens/BnbGas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options = {{headerShown: false}} name="EthereumGas" component={EthereumGas} />
          <Stack.Screen options = {{headerShown: false}} name="BnbGas" component={BnbGas} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
