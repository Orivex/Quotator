import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import logo from "@/assets/images/logo.png"
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Linking from 'expo-linking'

const About = () => {
  return (

    <View style ={styles.container}>

      <Image source={logo} style={styles.image}/>

      <View>

        <View style={styles.info_container}>
          <Pressable style={styles.info_button} onPress={()=>{Linking.openURL('https://github.com/Orivex')}}>
            <AntDesign name="github" size={50} color={Colors.appBlue.background} /> 
            <Text style={styles.info_text}>Orivex/Blacklight</Text>
          </Pressable>
        </View>

        <View style={styles.info_container}>
          <Pressable style={styles.info_button} onPress={()=>{Linking.openURL('https://www.youtube.com/@InformatiKater-42')}}>
            <AntDesign name="youtube" size={50} color={Colors.appBlue.background} />
            <Text style={styles.info_text}>InformatiKater</Text>
          </Pressable>
        </View>

        <View style={styles.info_container}>
          <Pressable style={styles.info_button} onPress={()=>{Linking.openURL('https://discordapp.com/users/763796222921277460 ')}}>
            <FontAwesome6 name="discord" size={50} color={Colors.appBlue.background} />
            <Text style={styles.info_text}>blacklight101</Text>
          </Pressable>
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
  info_button: {
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