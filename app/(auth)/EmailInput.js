import IconTextInput from '../../components/inputs/IconTextInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function EmailInput({ value, onChangeText }) {
  return (
    <IconTextInput
      leftIcon={<MaterialCommunityIcons name="email-outline" size={24} color="white" />}
      placeholder="Enter your email"
      autoCapitalize="none"
      keyboardType="email-address"
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor="white"
    />
  );
};