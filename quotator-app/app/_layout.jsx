import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SQLiteProvider } from 'expo-sqlite';
import { SnackbarProvider } from './context/SnackbarContext';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { View } from 'react-native';
import { QuoteProvider } from './context/QuoteContext'; 

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
      'baseFont': require('@/assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
      'quoteFont': require('@/assets/fonts/liberation_serif/LiberationSerif-Italic.ttf')
  });

  useEffect(()=> {
    if(loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  if (!loaded && !error) {
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
          category TEXT NOT NULL,
          neverShow BOOLEAN NOT NULL
          );
          PRAGMA journal_mode=WAL;
          `)
        } }
        options={{ useNewConnection: true }}>

        <QuoteProvider>
          <SnackbarProvider>
            <View style={{flex: 1, backgroundColor: Colors.appBlue.background}}>
              <Stack screenOptions={
                    {headerStyle: {backgroundColor: Colors.appBlue.background},
                    headerTintColor: Colors.appBlue.text, headerShadowVisible: false}}>
                <Stack.Screen name="quote" options={{title: "Quote", headerShown: false}}/>
                <Stack.Screen name="menu" options={{title: "Menu"}}/>
                <Stack.Screen name="filterView" options={{title: "Filter"}}/>
                <Stack.Screen name="about" options={{title: "About"}}/>
                <Stack.Screen name="quoteForm" options={{title: "Form"}}/>
                <Stack.Screen name="quotesView" options={{title: "Quotes"}}/>
                <Stack.Screen name="+not-found" />
              </Stack>
            </View>
          </SnackbarProvider>
        </QuoteProvider>
    </SQLiteProvider>
  );
}
