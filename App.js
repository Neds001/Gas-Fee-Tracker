import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';

function App() {
  const [gas, setGas] = useState([]);

  const loadData = async () => {
    const network = 'eth';
    const key = '3bb7a9ba8177423187079793b24b6748';
    const res = await fetch(`https://api.owlracle.info/v4/${network}/gas?apikey=${key}`);
    const data = await res.json();
    setGas(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <FlatList
        data={gas}
        renderItem={(item)=> {
          console.log(item);
          return <Text>gas</Text>
        }}
      />
    </View>
  );
}

export default App;
