import { View, Text, StyleSheet, Pressable } from 'react-native'
import {Link} from "expo-router"
import { Colors } from '@/constants/Colors'
import { FontFamilies } from '@/constants/FontFamilies'
import { quoteBoxStyle } from '@/constants/quoteBoxStyle'

const Quote = () => {
  return (

    <View style={styles.container}>
      <View 
        style = {styles.quoteContainer}
      >
        <Text style = {styles.quoteText}>
          "Das Leid von heute ist die Kraft von morgen"
        </Text>

      </View>

      <View style={styles.buttonContainer}>
        <Link href="/menu" style={{marginHorizontal: "auto"}} asChild>
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
    ...quoteBoxStyle,
    minHeight: 150
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
    fontFamily: FontFamilies.baseFont,
    textAlign: 'center',
    fontSize: 25
  }
})