import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../src/store/session';

export default function SignIn() {
  const router = useRouter();
  const { login } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const onSubmit = async () => {
    setBusy(true); setErr(null);
    try {
      await login(email, password);
      router.replace('/(app)/home');
    } catch (e) {
      const msg = e?.response?.data?.error || 'Login failed';
      setErr(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, gap: 12 }}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
        />
        {busy ? <ActivityIndicator/> : <Button title="Sign in" onPress={onSubmit} />}
        {err && <Text style={{ color: 'red' }}>{err}</Text>}
      </View>
    </SafeAreaView>
  );
}
