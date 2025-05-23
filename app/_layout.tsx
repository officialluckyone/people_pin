import { SnackbarProvider } from '@/components/providers/SnackbarProvider';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'DMSans-Black' : require('@/assets/fonts/DMSans/DMSans-Black.ttf'),
    'DMSans-BlackItalic' : require('@/assets/fonts/DMSans/DMSans-BlackItalic.ttf'),
    'DMSans-Bold' : require('@/assets/fonts/DMSans/DMSans-Bold.ttf'),
    'DMSans-BoldItalic' : require('@/assets/fonts/DMSans/DMSans-BoldItalic.ttf'),
    'DMSans-ExtraBold' : require('@/assets/fonts/DMSans/DMSans-ExtraBold.ttf'),
    'DMSans-ExtraBoldItalic' : require('@/assets/fonts/DMSans/DMSans-ExtraBoldItalic.ttf'),
    'DMSans-ExtraLight' : require('@/assets/fonts/DMSans/DMSans-ExtraLight.ttf'),
    'DMSans-ExtraLightItalic' : require('@/assets/fonts/DMSans/DMSans-ExtraLightItalic.ttf'),
    'DMSans-Italic' : require('@/assets/fonts/DMSans/DMSans-Italic.ttf'),
    'DMSans-Light' : require('@/assets/fonts/DMSans/DMSans-Light.ttf'),
    'DMSans-LightItalic' : require('@/assets/fonts/DMSans/DMSans-LightItalic.ttf'),
    'DMSans-Medium' : require('@/assets/fonts/DMSans/DMSans-Medium.ttf'),
    'DMSans-MediumItalic' : require('@/assets/fonts/DMSans/DMSans-MediumItalic.ttf'),
    'DMSans-Regular' : require('@/assets/fonts/DMSans/DMSans-Regular.ttf'),
    'DMSans-SemiBold' : require('@/assets/fonts/DMSans/DMSans-SemiBold.ttf'),
    'DMSans-SemiBoldItalic' : require('@/assets/fonts/DMSans/DMSans-SemiBoldItalic.ttf'),
    'DMSans-Thin' : require('@/assets/fonts/DMSans/DMSans-Thin.ttf'),
    'DMSans-ThinItalic' : require('@/assets/fonts/DMSans/DMSans-ThinItalic.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <SnackbarProvider>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen
                name="splash/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="home/index"
                options={{
                  headerTitle: () =>(
                    <Image
                      source={require('@/assets/images/people_pin/PeoplePin - Horizontal Logo.png')}
                      style={{ width: 120, height: 40, resizeMode: 'contain' }}
                      />
                  ),
                  headerStyle: { backgroundColor: Colors.light.background },
                  headerTitleAlign: 'left',
                }}
              />
              <Stack.Screen name="map/map" options={{ 
                  title: 'Location',
                    headerStyle: { backgroundColor: '#fff' }, // warna background header
                    headerTintColor: Colors.light.primary,                     // warna icon back dan tombol header
                    headerTitleStyle: { color: Colors.light.primary },    
                }} 
              />
            </Stack>
          </SafeAreaProvider>
          <StatusBar style="auto" />
        </SnackbarProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
