import { View, Text, StyleSheet, Pressable, Animated, useAnimatedValue } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'
import { FontFamilies } from '@/constants/FontFamilies'
import { quoteBoxStyle } from '@/constants/quoteBoxStyle'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const Quote = () => {
  const navigation = useNavigation();

  const db = useSQLiteContext();

  const [randomQuote, setRandomQuote] = useState({id: null, quote: '', author: ''});
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const loadRandomQuote = async () => {
      const result = await db.getAllAsync(`SELECT id, quote, author FROM quotes WHERE id!='${randomQuote.id}' ORDER BY RANDOM() LIMIT 1`);
      if(result.length > 0) {
        setRandomQuote(result[0])
      }
      else {
        setRandomQuote({quote: `This could be your quote!`, author: 'InformatiKater'})
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

  const pressInAnim = (scale) => {
    Animated.timing(scale, {
      toValue: 0.75,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const pressOutAnim = (scale) => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

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

      <View style={styles.quoteSection}>

        <Animated.View style={[styles.reload, {opacity: menuOpacity, transform: [{scale: scaleReload}, {rotate: rotationString}]}]}>
            <Pressable disabled={!menuVisible} onPress={() => {setReload(prev => prev+1); rotate();}} onPressIn={()=>{pressInAnim(scaleReload)}} onPressOut={()=>{pressOutAnim(scaleReload)}}>
                <Ionicons name="reload-circle" size={60} color={Colors.appGray.base} />
            </Pressable>
        </Animated.View>

        <View style = {styles.quoteContainer}>
          <Text style = {styles.quoteText} adjustsFontSizeToFit={true} numberOfLines={8}>
            "{randomQuote.quote}"
          </Text>
          <Text style = {styles.authorText} adjustsFontSizeToFit={true} numberOfLines={2}>
            - {randomQuote.author}
          </Text>
        </View>

        <Animated.View style={{transform: [{scale: scaleHomeMenu}]}}>
          <Pressable style={styles.open} onPress={homeMenu} onPressIn={()=>{pressInAnim(scaleHomeMenu)}} onPressOut={()=>{pressOutAnim(scaleHomeMenu)}}>
              <Feather name="loader" size={40} color={Colors.appGray.base} />
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
    fontFamily: FontFamilies.baseFont,
    textAlign: 'center',
    fontSize: 25
  },
  reload: {
    marginHorizontal: 'auto',
    marginBottom: 20
  },
  open: {
    marginHorizontal: 'auto',
    marginTop: 20
  }
})