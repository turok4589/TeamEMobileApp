import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { View, useColorScheme, Button, Image } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="registerAll" options={{ headerShown: false }} />
        <Stack.Screen name="dietPlan" options={{ headerShown: false }} />
        <Stack.Screen name="videos" options={{ headerShown: false }} />
        <Stack.Screen name="message" options={{headerTitle: 'ChatBot' }} />
        <Stack.Screen name="payment" options={{headerShown: false}} />
        <Stack.Screen name="bmiCalculator" options={{headerShown: false}} />
        <Stack.Screen name="home" options={{headerTitle: 'FitnessFreak',headerLeft:()=>(
          <Image source={require('../assets/images/gym.png')} style={{width: 100, height: 100, marginLeft: -20, marginRight: -20}}/>
        ) , headerRight: () => (
            <View style={{marginRight: 10}}>
            <Button
              title="Sign Out"
              onPress={()=>{AsyncStorage.clear(); router.replace('/')}}
            />
            </View>
          )}} />
        <Stack.Screen name="products" />
      </Stack>
    </ThemeProvider>
  );
}
