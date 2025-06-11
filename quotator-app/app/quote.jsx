import { View, Text, StyleSheet, Pressable, Animated, useAnimatedValue } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'
import { quoteBoxStyle } from '@/constants/quoteBoxStyle'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { pressInAnim, pressOutAnim } from './helper/animations.js'
import { useQuote } from './context/QuoteContext.jsx'
import AntDesign from '@expo/vector-icons/AntDesign';

const Quote = () => {
  const navigation = useNavigation();

  const db = useSQLiteContext();

  const { randomQuote, setRandomQuote, reload, setReload } = useQuote();

  useEffect(() => {

    const loadRandomQuote = async () => {
       
      let result = [];
      const nRowsCall = await db.getAllAsync('SELECT COUNT(*) as count FROM quotes');
      const nRows = nRowsCall[0].count;

      if(nRows == 0) {
        setRandomQuote({quote: 'This could be your quote. Add a quote and reload to see your first quote!', author: 'InformatiKater'})
      }
      else if (nRows == 1) {
        result = await db.getAllAsync(`SELECT id, quote, author FROM quotes WHERE neverShow = 0`);
        if(result.length == 0) {
          setRandomQuote({quote: 'The only quote that you have added is set to never be shown on the home screen.', author: 'InformatiKater'})
        }
        else {
          setRandomQuote(result[0]);
        }
      }
      else {
        result = await db.getAllAsync(`SELECT id, quote, author FROM quotes WHERE id!='${randomQuote.id}' AND neverShow = 0 ORDER BY RANDOM() LIMIT 1`);

        if(result.length > 0) {
          setRandomQuote(result[0]);
        }
        else {
          const neverShow_nRows_Call = await db.getAllAsync('SELECT COUNT(*) as count FROM quotes WHERE neverShow = 1');
          const neverShow_nRows = neverShow_nRows_Call[0].count;

          console.log(neverShow_nRows);

          if(neverShow_nRows == nRows) {
            setRandomQuote({quote: 'You have set all quotes to not be shown on the home screen.', author: 'InformatiKater'})
          }
        }
      }
    };

    loadRandomQuote();
  }, [reload])

  const [menuVisible, setMenuVisible] = useState(false);
  const menuOpacity = useAnimatedValue(0);


  const homeMenu = () => {
    if(menuVisible) {
      Animated.timing(menuOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    else {
      Animated.timing(menuOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    
    setMenuVisible(!menuVisible);
    
  };
  
  const scaleHomeMenu = useAnimatedValue(1);
  const scaleMenu = useAnimatedValue(1);
  const scaleAdd = useAnimatedValue(1);
  const scaleReload = useAnimatedValue(1);

  const rotation = useAnimatedValue(0);
  const rotationString = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const rotate = () => {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 359,
      duration: 400,
      useNativeDriver: true
    }).start();
  }

  return (

    <View style={styles.container}>

      <Animated.View style={{transform: [{scale: scaleHomeMenu}]}}>
        <Pressable style={styles.open} onPress={homeMenu} onPressIn={()=>{pressInAnim(scaleHomeMenu)}} onPressOut={()=>{pressOutAnim(scaleHomeMenu)}}>
            <AntDesign name={menuVisible?'upcircle':'downcircle'} size={40} color={menuVisible?Colors.appGray.base05:Colors.appGray.base} />
        </Pressable>
      </Animated.View>

      <View style={styles.quoteSection}>
    
        <View style = {styles.quoteContainer}>
          <Text style = {styles.quoteText} adjustsFontSizeToFit={true} numberOfLines={8}>
            "{randomQuote.quote}"
          </Text>
          <Text style = {styles.authorText} adjustsFontSizeToFit={true} numberOfLines={2}>
            - {randomQuote.author}
          </Text>
        </View>

        <Animated.View style={[styles.reload, {opacity: menuOpacity, transform: [{scale: scaleReload}, {rotate: rotationString}]}]}>
          <Pressable disabled={!menuVisible} onPress={() => {setReload(prev => prev+1); rotate();}} onPressIn={()=>{pressInAnim(scaleReload)}} onPressOut={()=>{pressOutAnim(scaleReload)}}>
              <Ionicons name="reload-circle" size={60} color={Colors.appGray.base} />
          </Pressable>
        </Animated.View>
        
      </View>

      <Animated.View style={{opacity: menuOpacity, flexDirection: 'row'}}>

          <Animated.View style={[{transform: [{scale: scaleMenu}]}, styles.button]}>
            <Pressable disabled={!menuVisible} onPress={() => navigation.navigate('menu')} onPressIn={()=>{pressInAnim(scaleMenu)}} onPressOut={()=>{pressOutAnim(scaleMenu)}} >
                <Text style={styles.buttonText}> Menu </Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={[{transform: [{scale: scaleAdd}]}, styles.button]}>
            <Pressable disabled={!menuVisible} onPress={() => navigation.navigate('quoteForm', {id: null})}onPressIn={()=>{pressInAnim(scaleAdd)}} onPressOut={()=>{pressOutAnim(scaleAdd)}}>
              <Text style={styles.buttonText}> Add </Text>
            </Pressable>
          </Animated.View>

      </Animated.View>

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
  quoteSection: {
    flex: 1,
    justifyContent: 'center',
  },
  quoteContainer: {
    ...quoteBoxStyle.quoteContainer,
  },
  quoteText: {
    ...quoteBoxStyle.quoteText
  },
  authorText: {
    ...quoteBoxStyle.authorText
  },
  button: {
    height: 60,
    width: 120,
    borderRadius: 50,
    backgroundColor: Colors.appGray.base,
    justifyContent: "center",
    marginBottom: 50,
    marginHorizontal: 'auto'
  },
  buttonText: {
    color: Colors.appBlue.text,
    fontFamily: 'baseFont',
    textAlign: 'center',
    fontSize: 25
  },
  reload: {
    marginHorizontal: 'auto',
    marginTop: 20
  },
  open: {
    marginHorizontal: 'auto',
    marginTop: 20
  }
})