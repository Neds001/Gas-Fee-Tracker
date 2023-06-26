import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const EthereumGas = () => {
  const [gasData, setGasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'HNYFG59NRZTGXZN6A6A4VZ2A4AWX1C44W3';
  const gasPrice = 2000000000; // Modify this value as desired

  const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('BnbGas');
      };

  useEffect(() => {
    const fetchGasData = async () => {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${API_KEY}`
        );

        if (response.ok) {
          const gasData = await response.json();
          setGasData(gasData.result);
        } else {
          console.log('Error fetching gas data:', response.status);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching gas data:', error);
        setLoading(false);
      }
    };

    fetchGasData();

    // Fetch data every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchGasData, 10000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getConfirmationTime = () => {
    if (gasData && gasData.ProposeGasPrice && gasData.SafeGasPrice) {
      const confirmationTime = Math.ceil((gasData.ProposeGasPrice - gasData.SafeGasPrice) / gasPrice);
      return confirmationTime;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.heading}>Ethereum Gas Tracker</Text>
          {gasData && (
            <View>
              <Text style={styles.fee}>Last Block: {gasData.LastBlock}</Text>
              <Text style={styles.fee}>Safe Gas Price: {gasData.SafeGasPrice}</Text>
              <Text style={styles.fee}>Propose Gas Price: {gasData.ProposeGasPrice}</Text>
              <Text style={styles.fee}>Fast Gas Price: {gasData.FastGasPrice}</Text>
              <Text style={styles.fee}>Confirmation Time: {getConfirmationTime()} blocks</Text>
            </View>
          )}
        </View>
      )}
        <TouchableOpacity onPress={onPress}>
            <Text style={{color: "blue"}}>Go to BNB PAGE</Text>
        </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fee: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EthereumGas;