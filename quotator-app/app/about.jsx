import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Linking from 'expo-linking'

const About = () => {
  return (

    <View style ={styles.container}>

        <View style={styles.info_container}>
          <Text style={[styles.info_text, {fontSize: 42}]}>Follow me!</Text>
        </View>

        <View style={styles.info_container}>
          <Pressable style={styles.info_button} onPress={()=>{Linking.openURL('https://github.com/Orivex')}}>
            <AntDesign name="github" size={50} color={Colors.appGray.base} /> 
            <Text style={styles.info_text}>Orivex/Blacklight</Text>
          </Pressable>
        </View>

        <View style={styles.info_container}>
          <Pressable style={styles.info_button} onPress={()=>{Linking.openURL('https://www.youtube.com/@InformatiKater-42')}}>
            <AntDesign name="youtube" size={50} color={Colors.appGray.base} />
            <Text style={styles.info_text}>InformatiKater</Text>
          </Pressable>
        </View>

        <View style={[styles.info_container, {marginBottom: 100}]}>
          <Pressable style={styles.info_button} onPress={()=>{Linking.openURL('https://discordapp.com/users/763796222921277460 ')}}>
            <FontAwesome6 name="discord" size={50} color={Colors.appGray.base} />
            <Text style={styles.info_text}>blacklight101</Text>
          </Pressable>
        </View>

    </View>
  )
}

export default About


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBlue.background,
    justifyContent: 'center'
  },
  info_container: {
    marginVertical: 30,
    alignItems: 'center',
  },
  info_button: {
    alignItems: 'center'
  },
  info_text: {
    color: Colors.appBlue.text,
    fontFamily: 'baseFont',
    fontSize: 30,
  }
})