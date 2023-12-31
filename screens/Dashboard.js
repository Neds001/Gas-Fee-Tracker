import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
  const [bnbGasData, setBnbGasData] = useState(null);
  const [ethGasData, setEthGasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(null);
  const bnbAPI_KEY = 'TCNY4UT93EH2719XS7KD3HVBP85KKKE273'; // Replace with your BSCScan API key
  const ethAPI_KEY = 'HNYFG59NRZTGXZN6A6A4VZ2A4AWX1C44W3';

  const navigation = useNavigation();

  const onPressNotifications = () => {
    navigation.navigate('Notifications');
  };

  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  const onPressDashboard = () => {
    navigation.navigate('Dashboard');
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
        } else {
          console.log('Error fetching BNB gas data:', response.status);
        }
      } catch (error) {
        console.log('Error fetching BNB gas data:', error);
      } finally {
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
        } else {
          console.log('Error fetching Ethereum gas data:', response.status);
        }
      } catch (error) {
        console.log('Error fetching Ethereum gas data:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchBnbGasData();
      fetchEthGasData();
    }, 10000);

    fetchBnbGasData();
    fetchEthGasData();

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
                  <Text style={styles.fee}>Low Gas Price: {bnbGasData.SafeGasPrice} Wei</Text>
                  <Text style={styles.fee}>Average Gas Price: {bnbGasData.ProposeGasPrice} Wei</Text>
                  <Text style={styles.fee}>Priority Gas Price: {bnbGasData.FastGasPrice} Wei</Text>
                </View>
              )}
            </View>
            <View style={styles.gasTracker}>
              <Text style={styles.gasTrackerTitle}>Ethereum Gas Tracker</Text>
              {ethGasData && (
                <View>
                  <Text style={styles.fee}>Last Block: {ethGasData.LastBlock}</Text>
                  <Text style={styles.fee}>Low Gas Price: {ethGasData.SafeGasPrice} Gwei</Text>
                  <Text style={styles.fee}>Average Gas Price: {ethGasData.ProposeGasPrice} Gwei</Text>
                  <Text style={styles.fee}>Priority Gas Price: {ethGasData.FastGasPrice} Gwei</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onPressNotifications}>
          <Ionicons name="notifications" size={21} color="#111827" />
          <Text style={styles.iconLabel}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={onPressDashboard}>
          <Ionicons name="home-sharp" size={21} color="#111827" />
          <Text style={styles.iconLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={onPressSettings}>
          <Ionicons name="settings-sharp" size={21} color="#111827" />
          <Text style={styles.iconLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fee: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#111827',
  },
});

export default Dashboard;
