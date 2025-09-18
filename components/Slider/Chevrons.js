import React from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export default function Chevrons() {
  const duration = 1000;
  const chevronOpacities = [0, 1, 2].map(() => useSharedValue(1));

  React.useEffect(() => {
    chevronOpacities.forEach((opacity, i) => {
      opacity.value = withDelay(
        i * (duration / 3),
        withRepeat(
          withTiming(0, { duration }),
          -1, 
          true
        )
      );
    });
  }, []);

  return (
    <View className="w-1/3 flex-row justify-end mr-1">
      {[0, 1, 2].map((i) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: chevronOpacities[i].value,
        }));
        return (
          <Animated.View
            key={i}
            className={`right-${i * 3}`}
            style={animatedStyle}
          >
            <Svg
              width="16"
              height="18"
              viewBox="0 0 11 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M2.02031 16.625L0.578125 15.1828L7.26094 8.5L0.578125 1.81719L2.02031 0.375L10.1453 8.5L2.02031 16.625Z"
                fill="white"
              />
            </Svg>
          </Animated.View>
        );
      })}
    </View>
  );
};
