import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthWrapper({ children }) {
  return(
    <ImageBackground className="flex-1" resizeMode="cover" source={require("../../assets/auth-background.png")}>
      <SafeAreaView className="flex-1 justify-between items-center bg-black/50 px-8 py-5">
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};