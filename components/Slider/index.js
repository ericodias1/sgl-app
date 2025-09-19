import { TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import Chevrons from "./Chevrons";
import Label from "./Label";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function Slider({ slideAction }) {
  const sliderLimitX = useRef(0);

  const [thumbWidth, setThumbWidth] = useState(0);
  const [sliding, setSliding] = useState(false);

  const thumbPosition = useSharedValue(0);

  function startSliding() {
    if (sliding) return;

    setSliding(true);

    thumbPosition.value = withSpring(sliderLimitX.current - thumbWidth, { duration: 1000 });
    setTimeout(() => {
      slideAction();
    }, 1100);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ width: '100%', height: '9%' }}
      className="bg-black/50 rounded-full shadow-lg shadow-black px-3 py-2"
      onPress={() => startSliding()}
    >
      <View
        className="flex-row justify-end items-center h-full"
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          sliderLimitX.current = width
        }}
      >
        <Animated.Image
          className="absolute z-10 bg-black rounded-full"
          style={{ width: thumbWidth, aspectRatio: 0, height: '100%', left: thumbPosition }}
          source={require("../../assets/icon.png")}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setThumbWidth(height)
          }}
        />
        <Label sliding={sliding}/>
        <Chevrons />
      </View>
    </TouchableOpacity>
  );
};