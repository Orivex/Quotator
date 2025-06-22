import { Animated, Pressable, Text, StyleSheet, useAnimatedValue } from 'react-native';
import { pressInAnim, pressOutAnim } from './animations';
import { Colors } from '@/constants/Colors';

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
      {useIcon ? icon: <Text numberOfLines={4} style={[styles.buttonText, {fontSize: labelFontSize}]}>{label}</Text>}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 275,
    borderRadius: 50,
    backgroundColor: Colors.appGray.base05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.appBlue.text,
    fontFamily: 'baseFont',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30
  },
});

export default AnimatedButton;
