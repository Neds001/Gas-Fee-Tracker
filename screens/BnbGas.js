import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import { useNavigation } from '@react-navigation/core';


function BnbGas() {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Dashboard');
      };
    return (
        <View>
            <Text>BNB GAS PAGE</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={{color: "blue"}}>Go to Dashboard</Text>
            </TouchableOpacity>
        </View>
        
    );
}

export default BnbGas;