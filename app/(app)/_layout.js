import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSession } from '../../src/store/session';

export default function AppLayout() {
  const { bootstrapped, accessToken, bootstrap } = useSession();
  const router = useRouter();

  useEffect(() => { bootstrap(); }, []);

  useEffect(() => {
    if (!bootstrapped) return;
    if (!accessToken) router.replace('/(auth)/sign-in');
  }, [bootstrapped, accessToken]);

  if (!bootstrapped) return <SplashScreen />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
