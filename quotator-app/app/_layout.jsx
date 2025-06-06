import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';

export default function RootLayout() {

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
      options={{ useNewConnection: true }}>

      <Stack screenOptions={{headerStyle: {backgroundColor: Colors.appBlue.background},
            headerTintColor: Colors.appBlue.text, headerShadowVisible: false}}>
        <Stack.Screen name="quote" options={{title: "Quote", headerShown: false}}/>
        <Stack.Screen name="menu" options={{title: "Menu"}}/>
        <Stack.Screen name="filterView" options={{title: "Filter"}}/>
        <Stack.Screen name="about" options={{title: "About"}}/>
        <Stack.Screen name="quoteForm" options={{title: "Form"}}/>
        <Stack.Screen name="quotesView" options={{title: "Quotes"}}/>
        <Stack.Screen name="+not-found" />
      </Stack>

  </SQLiteProvider>
  );
}
