import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface UserCardProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  lat: string;
  lng: string;
  onViewMap: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  username,
  email,
  address,
  lat,
  lng,
  onViewMap,
}) => {
  return (
    <View style={styles.card}>
        <View style={styles.topRow}>
            <Image
                source={require('@/assets/images/people_pin/PeoplePin - Vertical Logo.png')} // ganti dengan avatar default kamu
                style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.username}>@{username}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.idBadge}>
                <Text style={styles.idText}>ID: {id}</Text>
            </View>
        </View>

        <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={30} color={Colors.light.primary} />
            <View style={{ marginLeft:14 }}>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.coords}>Lat: {lat}, Lng: {lng}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.mapButton} onPress={onViewMap}>
            <Ionicons name="map" size={18} color={Colors.light.primary} />
            <Text style={styles.mapText}>View Map</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderColor:'#ccc',
    borderWidth: 3
  },
  name: {
    fontFamily:'DMSans-Bold',
    fontSize: 16,
    color: Colors.light.primary
  },
  username: {
    fontFamily:'DMSans-Light',
    fontSize: 14,
    color: Colors.light.text
  },
  email: {
    fontFamily:'DMSans-Light',
    fontSize: 13,
    color: Colors.light.text
  },
  idBadge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start'
  },
  idText: {
    color: '#fff',
    fontSize: 12
  },
  locationRow: {
    display:'flex',
    flexDirection:'row',
    marginBottom: 4,
    marginLeft:18
  },
  address: {
    fontSize: 14,
    color: Colors.light.text,
    fontFamily:'DMSans-Regular',
    flexShrink:1,
    flexWrap:'wrap',
    paddingEnd:50
  },
  coords: {
    fontSize: 12,
    color: Colors.light.text,
    marginBottom: 12,
    fontFamily:'DMSans-Regular',
    flexWrap:'wrap'
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.accent,
    alignSelf: 'flex-end',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  mapText: {
    marginLeft: 6,
    color: Colors.light.primary
  },
});

export default UserCard;
