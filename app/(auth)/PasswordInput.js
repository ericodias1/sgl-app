import { useEffect } from 'react';
import { View } from 'react-native';
import IconTextInput from '../../components/inputs/IconTextInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function PasswordInput({ value, onChangeText, setHidePassword, hidePassword }) {
  const progress = useSharedValue(hidePassword ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(hidePassword ? 1 : 0, { duration: 200 });
  }, [hidePassword]);

  const lineLength = Math.sqrt(24 * 24 + 24 * 24);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: lineLength * (1 - progress.value),
  }));

  const rightIcon = () => {
    return(
      <View>
        <MaterialCommunityIcons name="eye-outline" size={24} color="white" />
        <Svg
          width={24}
          height={24}
          className=""
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {[0, 3].map((i) => (
            <AnimatedLine
              key={i}
              x1="0"
              y1={`${0 - i}`}
              x2="24"
              y2={`${24 - i}`}
              stroke={i == 0 ? 'white' : 'black'}
              strokeWidth="2"
              strokeDasharray={lineLength}
              animatedProps={animatedProps}
            />
          ))}
        </Svg>
      </View>
    );
  };

  return(
    <IconTextInput
      leftIcon={<MaterialIcons name="lock-outline" size={24} color="white"/>}
      rightIcon={rightIcon()}
      rightIconOnPress={() => setHidePassword(!hidePassword)}
      placeholder="Enter your password"
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor="white"
      secureTextEntry={hidePassword}
    />
  );
};