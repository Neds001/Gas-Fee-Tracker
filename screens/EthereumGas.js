import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const GasTracker = () => {
  const [bnbGasData, setBnbGasData] = useState(null);
  const [ethGasData, setEthGasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(null);
  const bnbAPI_KEY = 'TCNY4UT93EH2719XS7KD3HVBP85KKKE273'; // Replace with your BSCScan API key
  const ethAPI_KEY = 'HNYFG59NRZTGXZN6A6A4VZ2A4AWX1C44W3';

  const navigation = useNavigation();
  const onPressBnb = () => {
    navigation.navigate('EthereumGas');
  };

  const onPressEth = () => {
    navigation.navigate('BnbGas');
  };

  useEffect(() => {
    const fetchBnbGasData = async () => {
      try {
        const response = await fetch(
          `https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${bnbAPI_KEY}`
        );

        if (response.ok) {
          const gasData = await response.json();
          setBnbGasData(gasData.result);
          console.log(gasData.result);
        } else {
          console.log('Error fetching BNB gas data:', response.status);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching BNB gas data:', error);
        setLoading(false);
      }
    };

    const fetchEthGasData = async () => {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ethAPI_KEY}`
        );

        if (response.ok) {
          const gasData = await response.json();
          setEthGasData(gasData.result);
          console.log(gasData);
        } else {
          console.log('Error fetching Ethereum gas data:', response.status);
        }
      } catch (error) {
        console.log('Error fetching Ethereum gas data:', error);
      }
    };

    fetchBnbGasData();
    fetchEthGasData();

    const intervalId = setInterval(() => {
      fetchBnbGasData();
      fetchEthGasData();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };

    const intervalId = setInterval(() => {
      updateCurrentTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.heading}>Gas Trackers</Text>
          <Text style={styles.time}>{currentTime}</Text>
          <View style={styles.gasTrackerContainer}>
            <View style={styles.gasTracker}>
              <Text style={styles.gasTrackerTitle}>BNB Gas Tracker</Text>
              {bnbGasData && (
                <View>
                  <Text style={styles.fee}>Last Block: {bnbGasData.LastBlock}</Text>
                  <Text style={styles.fee}>Safe Gas Price: {bnbGasData.SafeGasPrice} Wei</Text>
                  <Text style={styles.fee}>Propose Gas Price: {bnbGasData.ProposeGasPrice} Wei</Text>
                  <Text style={styles.fee}>Fast Gas Price: {bnbGasData.FastGasPrice} Wei</Text>
                </View>
              )}
              <TouchableOpacity style={styles.button} onPress={onPressBnb}>
                <Text style={styles.buttonText}>Go to Ethereum Gas Tracker</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gasTracker}>
              <Text style={styles.gasTrackerTitle}>Ethereum Gas Tracker</Text>
              {ethGasData && (
                <View>
                  <Text style={styles.fee}>Last Block: {ethGasData.LastBlock}</Text>
                  <Text style={styles.fee}>Safe Gas Price: {ethGasData.SafeGasPrice} Gwei</Text>
                  <Text style={styles.fee}>Propose Gas Price: {ethGasData.ProposeGasPrice} Gwei</Text>
                  <Text style={styles.fee}>Fast Gas Price: {ethGasData.FastGasPrice} Gwei</Text>
                </View>
              )}
              <TouchableOpacity style={styles.button} onPress={onPressEth}>
                <Text style={styles.buttonText}>Go to BNB Gas Tracker</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
  gasTrackerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  gasTracker: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
  },
  gasTrackerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fee: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default GasTracker;