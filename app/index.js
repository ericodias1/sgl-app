import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSession } from '../src/store/session'; // sua store

export default function Index() {
  const router = useRouter();
  const { bootstrapped, accessToken, bootstrap } = useSession();

  useEffect(() => { bootstrap(); }, []);

  useEffect(() => {
    if (!bootstrapped) return;

    if (accessToken) {
      router.replace('/(app)/home');
    } else {
      router.replace('/(welcome)');
    }
  }, [bootstrapped, accessToken]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
