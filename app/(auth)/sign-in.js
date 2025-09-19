import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useSession } from '../../src/store/session';

import Wrapper from "../../components/auth/Wrapper";
import IconTextInput from '../../components/inputs/IconTextInput';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedKeyboard, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

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

  const progress = useSharedValue(hidePassword ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(hidePassword ? 1 : 0, { duration: 400 });
  }, [hidePassword])


  const lineLength = Math.sqrt(24 * 24 + 24 * 24);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: lineLength * (1 - progress.value),
  }));


  return (
    <Wrapper>
      <Pressable onPress={() => router.replace('(welcome)')}>
        <MaterialIcons name="arrow-back" size={32} color="#edfc00" />
      </Pressable>
      <View className="flex-1 justify-end">
        <Animated.View className="flex-1 justify-end mb-10 gap-5 max-h-[70%]" style={animatedStyles}>
          <View className="flex gap-5" >
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
                <View>
                  <MaterialCommunityIcons name="eye-outline" size={24} color="white" />
                  <Svg
                    width={24}
                    height={24}
                    className=""
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <AnimatedLine
                      x1="0"
                      y1="0"
                      x2="24"
                      y2="24"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray={lineLength}
                      animatedProps={animatedProps}
                    />
                    <AnimatedLine
                      x1="0"
                      y1="-3"
                      x2="24"
                      y2="21"
                      stroke="black"
                      strokeWidth="2"
                      strokeDasharray={lineLength}
                      animatedProps={animatedProps}
                    />
                  </Svg>
                </View>
              }
              rightIconOnPress={() => setHidePassword(!hidePassword)}
              placeholder="Enter your password"
              onChangeText={setPassword}
              value={password}
              placeholderTextColor="white"
              secureTextEntry={hidePassword}
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
