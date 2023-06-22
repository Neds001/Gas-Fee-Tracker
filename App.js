import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ethers } from 'ethers';

const App = () => {
  const [gasFees, setGasFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGasFees = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://ethgasstation.info/json/ethgasAPI.json');
        const gasPrice = await provider.getGasPrice();
        const gasFeesInGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
        const gasFeesInEther = ethers.utils.formatEther(gasPrice);

        const gasFeesData = [
          { label: 'Gas Price (Gwei)', value: gasFeesInGwei },
          { label: 'Gas Price (Ether)', value: gasFeesInEther }
        ];

        setGasFees(gasFeesData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching gas fees:', error);
        setLoading(false);
      }
    };

    fetchGasFees();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.heading}>Ethereum Gas Fees:</Text>
          {gasFees.map((fee, index) => (
            <Text key={index} style={styles.fee}>
              {fee.label}: {fee.value}
            </Text>
          ))}
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
  fee: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;