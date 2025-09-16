import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { api } from '../../src/api/client';
import { useSession } from '../../src/store/session';

export default function Home() {
  const [me, setMe] = useState(null);
  const { logout } = useSession();
  const router = useRouter();

  useEffect(() => {
    api.get('/api/me').then(r => setMe(r.data)).catch(() => {});
  }, []);

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
      <Text>{me ? JSON.stringify(me) : 'Loading /me...'}</Text>
      <Button title="Logout" onPress={async () => { await logout(); router.replace('/(auth)/sign-in'); }} />
    </View>
  );
}