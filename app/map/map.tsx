import { useSnackbar } from '@/components/providers/SnackbarProvider';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Coords = {
  latitude: number
  longitude: number
  name?: string
  address?: string
}

export default function MapScreen() {
  const { coords } = useLocalSearchParams()
  const { showSnackbar } = useSnackbar()

  const [parsedCoords, setParsedCoords] = useState<Coords | null>(null)

  useEffect(() => {
    if (!coords) {
      showSnackbar('Coordinates not available')
      return
    }

    try {
      const result = JSON.parse(coords as string)

      if (
        typeof result.latitude !== 'number' ||
        typeof result.longitude !== 'number'
      ) {
        showSnackbar('Coordinates must be numeric')
        return
      }

      setParsedCoords(result)
    } catch {
      showSnackbar('Invalid coordinate format')
    }

    showSnackbar('Map loaded successfully!');
  }, [coords, showSnackbar])

  if (!parsedCoords) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Tidak dapat menampilkan peta.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parsedCoords.latitude,
          longitude: parsedCoords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={parsedCoords}
          title={parsedCoords.name ?? 'Lokasi'}
          description={parsedCoords.address ?? ''}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  map: {
    flex: 1,
  },
})
