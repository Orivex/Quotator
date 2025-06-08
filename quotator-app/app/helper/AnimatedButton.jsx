import { Animated, Pressable, Text, StyleSheet, useAnimatedValue } from 'react-native';
import { pressInAnim, pressOutAnim } from './animations';
import { Colors } from '@/constants/Colors';
import { FontFamilies } from '@/constants/FontFamilies';

const AnimatedButton = ({ label="", labelFontSize, useIcon=false, icon=null, onPress }) => {
  const scale = useAnimatedValue(1);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => pressInAnim(scale)}
        onPressOut={() => pressOutAnim(scale)}
        style={useIcon ? null: styles.button}
      >
      {useIcon ? icon: <Text style={[styles.buttonText, {fontSize: labelFontSize}]}>{label}</Text>}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 75,
    width: 250,
    borderRadius: 50,
    backgroundColor: Colors.appGray.base05,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.appBlue.text,
    fontFamily: FontFamilies.baseFont,
    textAlign: "center",
  },
});

export default AnimatedButton;
