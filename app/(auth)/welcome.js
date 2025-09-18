import "../../global.css"
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../../components/Slider";
import { router } from "expo-router";

export default function Welcome() {

  const goToSignIn = () => {
    router.replace('(auth)/sign-in');
  };

  return (
    <ImageBackground className="flex-1" resizeMode="cover" source={require("../../assets/auth-background.png")}>
      <SafeAreaView className="flex-1 justify-between items-center bg-black/50 px-8 py-5">
        <Image style={{ width: '100%', height: '15%'}}
               source={require("../../assets/icon_with_name.png")} />

        <View className="flex gap-5 mb-10">
          <Text className="text-white font-extrabold text-center"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                  fontSize: 40 }}
            >
            Indoor Golf,{'\n'}Real Technology
          </Text>
          
          <Text className="text-white text-center text-lg"
                style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: {width: -1, height: 1},
                        textShadowRadius: 10 }}
          >
            Connect players, leagues, and venues in a complete digital experience!
          </Text>
        </View>

        <Slider slideAction={goToSignIn} />
      </SafeAreaView>
    </ImageBackground>
  );
}