import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={tw`absolute right-5 bottom-5 w-14 h-14 rounded-full bg-indigo-600 justify-center items-center shadow-lg`}
      onPress={onPress}
    >
      <Text style={tw`text-white text-2xl font-bold`}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;