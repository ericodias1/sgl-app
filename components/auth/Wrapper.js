import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthWrapper({ children }) {
  return(
    <ImageBackground className="flex-1" resizeMode="cover" source={require("../../assets/auth-background.png")}>
      <SafeAreaView className="flex-1 px-8 py-5  bg-black/50">
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};