import { TextInput, TouchableOpacity, View } from "react-native";

export default function IconTextInput({ leftIcon, rightIcon, rightIconOnPress, wrapperClasses, inputClasses, ...props }) {
  return (
    <View className={`flex justify-center ${wrapperClasses ||  "bg-black/60 rounded-full"}`}>
      {leftIcon && (
        <View className={`absolute left-3 p-2`}>
          {leftIcon}
        </View>
      )}

      <TextInput
        {...props}
        className={`${ leftIcon && 'ml-3 pl-12' } ${ rightIcon && 'mr-3 pr-12' } ${inputClasses || "text-white text-[15px] py-5"} px-5`}
      />
     
     {rightIcon && (
        <TouchableOpacity
          className={`absolute right-3 p-2 z-10`}
          onPress={rightIconOnPress}
          activeOpacity={1}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  )
}