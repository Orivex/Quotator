import {Animated} from 'react-native';

export const pressInAnim = (scale) => {
  Animated.timing(scale, {
    toValue: 0.75,
    duration: 100,
    useNativeDriver: true
  }).start();
};
export const pressOutAnim = (scale) => {
  Animated.timing(scale, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true
  }).start();
};