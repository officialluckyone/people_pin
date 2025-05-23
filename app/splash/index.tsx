import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const position = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: height / 2 - 400,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        router.replace('/home');
      }, 2000);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: position }] }}>
        <Image
          source={require('@/assets/images/people_pin/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});
