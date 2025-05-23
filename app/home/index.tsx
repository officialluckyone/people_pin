import { useSnackbar } from '@/components/providers/SnackbarProvider';
import SkeletonCard from '@/components/SkeletonCard';
import UserCard from '@/components/UserCard';
import Colors from '@/constants/Colors';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};


export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { showSnackbar } = useSnackbar()

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
      showSnackbar('Successfully loaded user data')
    } catch (error) {
      console.error(error)
      showSnackbar('Failed to load user data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading && !refreshing) {
    return (
      <View style={{ padding: 16 }}>
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
      <View style={{ paddingLeft:20, paddingRight:20 }}>
        <Text style={styles.textTitle}>People List</Text>
          <View style={{ marginTop:5 }}>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: insets.bottom + 16, // ⬅️ Tambahkan ini agar konten tidak tertutup
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                <UserCard
                  id={item.id}
                  name={item.name}
                  username={item.username.toLowerCase()}
                  email={item.email.toLowerCase()}
                  address={`${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`}
                  lat={item.address.geo.lat}
                  lng={item.address.geo.lng}
                  onViewMap={() => router.push({
                    pathname:'/map/map',
                    params:{ coords: JSON.stringify({
                      latitude : parseFloat(item.address.geo.lat),
                      longitude: parseFloat(item.address.geo.lng),
                      name: item.name,
                      address:`${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`
                    })}
                  })} // atau navigation.navigate('Map')
                />
              )}
            />
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textTitle: { 
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
    color: Colors.light.primary,
    marginLeft:10
  },
});
