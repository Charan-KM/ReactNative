import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import tw from "tailwind-react-native-classnames";
import { MERCHANTS, CURRENCIES } from "../constants/dropdownOptions";

const CreateClaimPage = () => {
  const navigation = useNavigation();

  const [merchant, setMerchant] = useState(null);
  const [merchantOpen, setMerchantOpen] = useState(false);

  const [currency, setCurrency] = useState(null);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);

  const pickReceipt = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to allow access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReceipt(result.assets[0].uri);
    }
  };

  const handleCreateClaim = () => {
    if (!merchant || !amount || !currency || !receipt) {
      alert("All fields are required!");
      return;
    }

    const newClaim = {
      id: Math.random().toString(),
      merchant,
      amount,
      currency,
      receipt,
      status: "Draft",
    };

    navigation.navigate("ReimbursementsPage", { newClaim });
  };

  return (
    <View style={tw`flex-1 p-5 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-5`}>Create Claim</Text>

      <DropDownPicker
        open={merchantOpen}
        value={merchant}
        items={MERCHANTS}
        setOpen={setMerchantOpen}
        setValue={setMerchant}
        placeholder="Select Merchant"
        style={tw`mb-3 border border-gray-300 rounded-lg`}
        containerStyle={tw`z-50`}
        zIndex={1000}
      />

      <TextInput
        style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <DropDownPicker
        open={currencyOpen}
        value={currency}
        items={CURRENCIES}
        setOpen={setCurrencyOpen}
        setValue={setCurrency}
        placeholder="Select Currency"
        style={tw`mb-3 border border-gray-300 rounded-lg`}
        containerStyle={tw`z-40`}
        zIndex={900}
      />

      <TouchableOpacity onPress={pickReceipt} style={tw`bg-gray-200 p-3 rounded-lg items-center mb-3`}>
        <Text style={tw`text-gray-700`}>{receipt ? "Receipt Selected" : "Upload Receipt"}</Text>
      </TouchableOpacity>

      {receipt && <Image source={{ uri: receipt }} style={tw`w-24 h-24 self-center mb-3`} />}

      <TouchableOpacity onPress={handleCreateClaim} style={tw`bg-blue-600 p-4 rounded-lg items-center`}>
        <Text style={tw`text-white font-bold`}>Create Claim</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateClaimPage;