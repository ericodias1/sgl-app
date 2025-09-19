import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../src/store/session';
import Wrapper from "../../components/auth/Wrapper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export default function SignIn() {
  const router = useRouter();
  const { login } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);

  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: (-keyboard.height.value) }],
  }))

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
    <Wrapper>
      <Pressable onPress={() => router.replace('(welcome)')}>
        <MaterialIcons name="arrow-back" size={32} color="#edfc00" />
      </Pressable>

      <View className="flex-1 justify-end">
        <Animated.View className="flex-1 justify-end mb-10 gap-5 max-h-[70%]" style={animatedStyles}>
          <View className="flex gap-5" >
            <EmailInput
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />
          </View>

          <View className="flex-row justify-end">
            <Text className="text-white font-semibold">Forgot Password?</Text>
          </View>

          {busy ? (
            <View
              className="bg-brand-600 py-6 rounded-full items-center shadow-xl shadow-brand-600"
              onTouchStart={() => setBusy(false)}
            >
              <ActivityIndicator color="#745e0f"/> 
            </View>
          ) : (
            <TouchableHighlight
              onPress={() => setBusy(true)}
              underlayColor="#d1cb00"
              className="bg-brand-500 py-5 rounded-full items-center shadow-xl shadow-brand-600"
            >
              <Text className="text-[#1C1B1F] font-semibold text-2xl">
                Login
              </Text>
            </TouchableHighlight>
          )}

          {err && <Text style={{ color: 'red' }}>{err}</Text>}
        </Animated.View>
      </View>
    </Wrapper>
  );
}
