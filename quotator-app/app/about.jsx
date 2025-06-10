import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import logo from "@/assets/images/logo.png"
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const About = () => {
  return (

    <View style ={styles.container}>

      <Image source={logo} style={styles.image}/>

      <View>

        <View style={styles.info_container}>
          <AntDesign name="github" size={50} color={Colors.appBlue.background} /> 
          <Text style={styles.info_text}> Orivex </Text>
        </View>

        <View style={styles.info_container}>
          <AntDesign name="youtube" size={50} color={Colors.appBlue.background} />
          <Text style={styles.info_text}> InformatiKater </Text>
        </View>

        <View style={styles.info_container}>
          <FontAwesome6 name="discord" size={50} color={Colors.appBlue.background} />
          <Text style={styles.info_text}> blacklight101 </Text>
        </View>

      </View>
    </View>
  )
}

export default About


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  info_container: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info_text: {
    color: Colors.appBlue.text,
    fontFamily: 'baseFont',
    fontSize: 30,
  },
  image: {
    width: '100%', 
    height: 300,
    alignSelf: "center"
  }
})