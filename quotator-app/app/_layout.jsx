import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';

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

      <SQLiteProvider
      databaseName='quotes.db'
      onInit={async (db) => {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        quote TEXT NOT NULL,
        category TEXT NOT NULL
        );
        PRAGMA journal_mode=WAL;
        `)
      } }
      options={{ useNewConnection: true }} children={undefined}>

      <Stack screenOptions={{headerStyle: {backgroundColor: theme.headerBackground}, headerTintColor: theme.text, headerShadowVisible: false}}>
        <Stack.Screen name="quote" options={{title: "Quote", headerShown: false}}/>
        <Stack.Screen name="menu" options={{title: "Menu", headerStyle: {backgroundColor: Colors.appBlue.background}, headerTintColor: Colors.appBlue.text}}/>
        <Stack.Screen name="authors" options={{title: "Authors", headerStyle: {backgroundColor: Colors.appBlue.background}, headerTintColor: Colors.appBlue.text}}/>
        <Stack.Screen name="about" options={{title: "About", headerStyle: {backgroundColor: Colors.appBlue.background}, headerTintColor: Colors.appBlue.text}}/>
        <Stack.Screen name="add" options={{title: "Add", headerTitle: "Add quote", headerStyle: {backgroundColor: Colors.appBlue.background}, headerTintColor: Colors.appBlue.text}}/>
        <Stack.Screen name="quotesView" options={{title: "Quotes", headerStyle: {backgroundColor: Colors.appBlue.background}, headerTintColor: Colors.appBlue.text}}/>
        <Stack.Screen name="+not-found" />
      </Stack>

  </SQLiteProvider>
  );
}
