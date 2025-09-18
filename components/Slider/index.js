import { useRef, useState } from "react";
import "../../global.css"
import { TouchableOpacity } from "react-native";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import Chevrons from "./Chevrons";
import Label from "./Label";

export default function Slider({ slideAction }) {
  const sliderPos = useSharedValue(0);
  const sliderRef = useRef({ sliderIconWidth: 0, slideLimitX: 0 });
  const [sliding, setSliding] = useState(false);

  function startSliding() {
    if (sliding) return;

    setSliding(true);
    sliderPos.value = withSpring(sliderRef.current.slideLimitX);
    setTimeout(() => {
      slideAction();
    }, 800);
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ width: '100%', height: '9%' }}
      className="bg-black/50 rounded-full shadow-lg shadow-black px-3 py-2 flex-row justify-end items-center"
      onPress={() => startSliding()}
      onLayout={(event) => {
        const { x, width } = event.nativeEvent.layout;
        sliderRef.current.slideLimitX = (width - x - sliderRef.current.sliderIconWidth);
      }}
    >
      <Animated.Image
        className="absolute mx-3 my-2 z-10 bg-black rounded-full"
        style={{ width: '18%', height: '100%', left: sliderPos }}
        source={require("../../assets/icon.png")}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          sliderRef.current.sliderIconWidth = width;
        }}
      />
      <Label sliding={sliding}/>
      <Chevrons />
    </TouchableOpacity>
  );
};