import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

const EmptyState = () => {
  return (
    <View style={tw`flex-1 justify-center items-center px-5`}>
      <Image
        source={require("../../assets/empty.png")}
        style={tw`w-36 h-36 mb-5`}
        resizeMode="contain"
      />
      <Text style={tw`text-lg text-gray-500`}>No claims yet!</Text>
    </View>
  );
};

export default EmptyState;