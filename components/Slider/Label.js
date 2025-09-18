import { useEffect } from "react";
import { Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

export default function Label({ sliding }) {
  const labelOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }));

  useEffect(() => {
    if (sliding) {
      labelOpacity.value = withSpring(0.25);
    } else {
      labelOpacity.value = withSpring(1);
    };
  }, [sliding]);

  return (
    <Animated.View className="w-1/3" style={animatedStyle}>
      <Text className="text-white text-center font-bold text-xl">
        Get started
      </Text>
    </Animated.View>
  );
};
