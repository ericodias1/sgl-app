import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useSession } from '../../src/store/session';

import Wrapper from "../../components/auth/Wrapper";
import IconTextInput from '../../components/inputs/IconTextInput';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SignIn() {
  const router = useRouter();
  const { login } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);

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
      <View className="flex-1 justify-end">
        <View className="flex-1 justify-center gap-5 max-h-[80%]">
          <IconTextInput
            leftIcon={
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="white"
              />
            }
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="white"
          />

          <IconTextInput
            leftIcon={
             <MaterialIcons name="lock-outline" size={24} color="white"/>
            }
            rightIcon={
              <MaterialCommunityIcons name={hidePassword ? "eye-outline" : "eye-off-outline"} size={24} color="white" />
            }
            rightIconOnPress={() => setHidePassword(!hidePassword)}
            placeholder="Enter your password"
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="white"
            secureTextEntry={hidePassword}
          />

          <View className="flex-row justify-end">
            <Text className="text-white font-semibold">Forgot Password?</Text>
          </View>

          {busy ? (
            <ActivityIndicator /> 
          ) : (
            <TouchableOpacity
              className="w-full bg-brand-500 py-5 flex rounded-full items-center"
              onPress={() => console.log('login')}
            >
              <Text className="text-[#1C1B1F] font-semibold text-2xl ">
                Login
              </Text>
            </TouchableOpacity>
          )}
          {err && <Text style={{ color: 'red' }}>{err}</Text>}
        </View>
      </View>
    </Wrapper>
  );
}
