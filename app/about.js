import { Text, View } from "react-native";

export default function About() {
    return (
    <View>
      <View>
        <Text className="text-2xl font-bold text-green-500">About Screen</Text>
        <Text>This is the first page of your app.</Text>
        <Link href="/" className="btn-primary">Home</Link>
      </View>
    </View>
  );
}