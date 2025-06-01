import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import logo from "@/assets/images/logo.png"
import { Colors } from '@/constants/Colors'
import toRGBA from './toRGBA'

const About = () => {
  return (

    <View style ={styles.container}>

      <Image source={logo} style={styles.image}/>

      <View>

          <View style = {styles.info_container}>

        <Text style = {[styles.info_text, {fontSize: 42}]}>
          Quotator
        </Text>
        <Text style = {styles.info_text}> 
          This app is the perfect way to always get remembered of quotes that you do not want to forget.
        </Text>
        <Text style = {[styles.info_text, {marginTop: 40}]}> Youtube: InformatiKater</Text>
        <Text style = {styles.info_text}> Github: Blacklight7</Text>
      </View>

      </View>
    </View>
  )
}

export default About


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: toRGBA(Colors.appBlue.background, 0.75),
  },
  info_container: {
    paddingHorizontal: 10,
    alignItems: "flex-start"
  },
  info_text: {
    marginTop: 6,
    color: Colors.appBlue.text
  },
  image: {
    width: '100%', 
    height: 300,
    alignSelf: "center"
  }
})