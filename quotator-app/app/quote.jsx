import { View, Text, StyleSheet, Pressable } from 'react-native'
import {Link} from "expo-router"
import { Colors } from '@/constants/Colors'
import { FontFamilies } from '@/constants/FontFamilies'
import { SQLiteProvider } from 'expo-sqlite'

const Quote = () => {
  return (

    <View style={styles.container}>
      
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
        options={{ useNewConnection: false }} children={undefined}>
    </SQLiteProvider>
      
      <View 
        style = {styles.quoteContainer}
      >
        <Text style = {styles.quoteText}>
          "Das Leid von heute ist die Kraft von morgen"
        </Text>

      </View>

      <View style={styles.buttonContainer}>
        <Link href="/authors" style={{marginHorizontal: "auto"}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}> Menu </Text>
          </Pressable>
        </Link>

        <Link href="/add" style={{marginHorizontal: "auto"}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}> Add </Text>
          </Pressable>
        </Link>
      </View>

    </View>

  )
}

export default Quote

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBlue.background,
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  quoteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appBlue.background
  },
  quoteText: {
    width: '100%',
    fontFamily: "sans-serif-light",
    color: Colors.appBlue.text,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 4,
    paddingVertical: 75
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    height: 60,
    width: 120,
    borderRadius: 50,
    backgroundColor: Colors.appGray.buttonBackground,
    justifyContent: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: Colors.appBlue.text,
    fontFamily: FontFamilies.baseFontFamily,
    textAlign: 'center',
    fontSize: 25
  }
})