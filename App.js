import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [gasData, setGasData] = useState(null);

  const fetchData = async () => {
    const network = 'eth';
    const key = '3bb7a9ba8177423187079793b24b6748';
    const res = await fetch(`https://api.owlracle.info/v4/${network}/gas?apikey=${key}`);
    const data = await res.json();
    setGasData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reloadGasData = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.reloadButton} onPress={reloadGasData}>
        <Text style={styles.reloadText}>Reload</Text>
      </TouchableOpacity>
      
      {gasData && (
        <View style={styles.gasDataContainer}>
          <Text style={styles.headerText}>Gas Data:</Text>
          <View style={styles.gasFeeContainer}>
            <View style={styles.gasFeeItem}>
              <Text style={styles.gasFeeLabel}>Low:</Text>
              <Text style={styles.gasFeeValue}>{gasData.low}</Text>
            </View>
            <View style={styles.gasFeeItem}>
              <Text style={styles.gasFeeLabel}>Average:</Text>
              <Text style={styles.gasFeeValue}>{gasData.average}</Text>
            </View>
            <View style={styles.gasFeeItem}>
              <Text style={styles.gasFeeLabel}>Priority:</Text>
              <Text style={styles.gasFeeValue}>{gasData.priority}</Text>
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
    padding: 16,
  },
  reloadButton: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  reloadText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  gasDataContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gasFeeContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  gasFeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gasFeeLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  gasFeeValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
