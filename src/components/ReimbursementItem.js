import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import { getRandomColor } from "../utils/common";

const STATUS_COLORS = {
  Draft: "text-gray-500",
  "Approval Pending": "text-yellow-500",
  Approved: "text-green-500",
};

const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getMerchantAvatar = (merchant) => {
  return {
    initials: getInitials(merchant),
    backgroundColor: getRandomColor(),
  };
};

const ReimbursementItem = ({ item }) => {
  const { initials, backgroundColor } = getMerchantAvatar(item?.merchant);

  return (
    <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
      <View style={[tw`w-10 h-10 rounded-full justify-center items-center`, { backgroundColor }]}>
        <Text style={tw`text-white font-bold`}>{initials}</Text>
      </View>

      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`text-lg font-semibold`}>{item?.merchant}</Text>
        <Text style={tw`${STATUS_COLORS[item?.status]} text-xs mt-1`}>
          {item?.status}
        </Text>
      </View>

      <View style={tw`items-end`}>
        <Text style={tw`text-lg font-bold`}>
          {item?.amount} {item?.currency}
        </Text>
      </View>
    </View>
  );
};

export default ReimbursementItem;