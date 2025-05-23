import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


// const staticLat = -2.200000;
// const staticLong = 200.816666;

export default function App() {
  const params = useLocalSearchParams();
  const coords = JSON.parse(params.coords as string);
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ 
          latitude:coords.latitude,
          longitude:coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
         }}
      >
        <Marker coordinate={coords} title="Lokasi" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { 
    width:'100%',
    height:'100%'
   },
});
