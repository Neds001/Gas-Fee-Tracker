import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';


function Notifications() {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Dashboard');
      };
    return (
        <View>
            <Text>Notifications</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={{color: "blue"}}>Go to Dashboard</Text>
            </TouchableOpacity>
        </View>
        
    );
}

export default Notifications;