import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'
import { FontFamilies } from '@/constants/FontFamilies'
import { quoteBoxStyle } from '@/constants/quoteBoxStyle'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'

const Quote = () => {
  const navigation = useNavigation();

  const db = useSQLiteContext();

  const [randomQuote, setRandomQuote] = useState({quote: '', author: ''});

  useEffect(() => {
    const loadRandomQuote = async () => {
      const result = await db.getAllAsync('SELECT quote, author FROM quotes ORDER BY RANDOM() LIMIT 1');
      setRandomQuote(result[0])
    };

    loadRandomQuote();
  }, [])

  console.log(randomQuote)


  return (

    <View style={styles.container}>
      <View 
        style = {styles.quoteContainer}
      >
        <Text style = {styles.quoteText}>
          "{randomQuote.quote}"
        </Text>

        <Text style = {styles.authorText}>
          - {randomQuote.author}
        </Text>

      </View>

      <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('menu')} >
            <Text style={styles.buttonText}> Menu </Text>
          </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('quoteForm', {id: null})}>
          <Text style={styles.buttonText}> Add </Text>
        </Pressable>
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
    ...quoteBoxStyle.quoteContainer,
    marginTop: 200
  },
  quoteText: {
    ...quoteBoxStyle.quoteText
  },
  authorText: {
    ...quoteBoxStyle.authorText
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    height: 60,
    width: 120,
    borderRadius: 50,
    backgroundColor: Colors.appGray.base05,
    justifyContent: "center",
    marginBottom: 50,
    marginHorizontal: 'auto'
  },
  buttonText: {
    color: Colors.appBlue.text,
    fontFamily: FontFamilies.baseFont,
    textAlign: 'center',
    fontSize: 25
  }
})