import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme == 'dark' ? Colors.dark: Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <Stack screenOptions={{headerStyle: {backgroundColor: theme.headerBackground}, headerTintColor: theme.text, headerShadowVisible: false}}>
        <Stack.Screen name="quote" options={{title: "Quote", headerShown: false}}/>
        <Stack.Screen name="authors" options={{title: "Authors", headerShown: true}}/>
        <Stack.Screen name="about" options={{title: "About", headerShown: true}}/>
        <Stack.Screen name="add" options={{title: "Add", headerShown: false}}/>
        <Stack.Screen name="quotesView" options={{title: "Quotes", headerShown: true}}/>
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
