import { useRef, useState } from "react";
import "../../global.css"
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Path } from "react-native-svg";

export default function Welcome() {
  return (
    <ImageBackground className="flex-1" resizeMode="cover" source={require("../../assets/auth-background.png")}>
      <SafeAreaView className="flex-1 justify-between items-center bg-black/50 px-8 py-5">
        <Image style={{ width: '100%', height: '15%'}} source={require("../../assets/icon_with_name.png")} />


        <Text className="text-white text-5xl font-extrabold text-center shadow">Indoor Golf,{'\n'}Real Technology</Text>

        <View style={{ width: '100%', height: '9%' }}
              className="bg-black/50 rounded-full shadow-lg shadow-black px-3 py-2 flex-row justify-end items-center"
        >
          <Animated.Image
            className="absolute mx-3 my-2 z-10"
            style={{ width: '18%', height: '100%', left: 0 }}
            source={require("../../assets/icon.png")}
          />

          <View className="w-1/3">
            <Text className="text-white text-center font-bold text-xl">
              Get started
            </Text>
          </View>


          <View className="w-1/3 flex-row mb-4">
            {[0, 1, 2].map((i) => (
              <View className={`absolute right-${i * 3}`} key={i}>
                <Svg width="16" height="18" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M2.02031 16.625L0.578125 15.1828L7.26094 8.5L0.578125 1.81719L2.02031 0.375L10.1453 8.5L2.02031 16.625Z" fill="white"/>
                </Svg>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}