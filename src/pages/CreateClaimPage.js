import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import tw from "tailwind-react-native-classnames";
import { MERCHANTS, CURRENCIES } from "../constants/dropdownOptions";
import { Feather } from "@expo/vector-icons";

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
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-2xl font-bold mb-1`}>Create claim</Text>
      <Text style={tw`text-gray-500 mb-5`}>Reimbursement</Text>

<View style={tw`border-2 border-gray-300 border-dashed rounded-lg p-5 mb-4 items-center`}>
  {receipt ? (
    <Image source={{ uri: receipt }} style={tw`w-32 h-32 rounded-lg`} />
  ) : (
    <TouchableOpacity onPress={pickReceipt} style={tw`items-center`}>
      <Feather name="upload" size={24} color="gray" />
      <Text style={tw`text-blue-600 font-semibold mt-1`}>Upload receipts</Text>
      <Text style={tw`text-gray-400 text-xs`}>PNG, JPG, PDF up to 5 MB</Text>
    </TouchableOpacity>
  )}
</View>

      <DropDownPicker
        open={merchantOpen}
        value={merchant}
        items={MERCHANTS}
        setOpen={setMerchantOpen}
        setValue={setMerchant}
        placeholder="Merchant"
        style={tw`mb-3 border border-gray-300 rounded-lg`}
        containerStyle={tw`z-50`}
        zIndex={1000}
      />

      <DropDownPicker
        open={currencyOpen}
        value={currency}
        items={CURRENCIES}
        setOpen={setCurrencyOpen}
        setValue={setCurrency}
        placeholder="Currency"
        style={tw`mb-3 border border-gray-300 rounded-lg`}
        containerStyle={tw`z-40`}
        zIndex={900}
      />

      <TextInput
        style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3`}>
        <Text style={tw`flex-1 text-gray-500`}>Transaction date</Text>
        <Feather name="calendar" size={20} color="gray" />
      </View>

      <View style={tw`flex-row justify-between mt-6`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`border border-gray-400 px-6 py-3 rounded-lg`}>
          <Text style={tw`text-gray-600`}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCreateClaim}
          disabled={!merchant || !amount || !currency || !receipt}
          style={[
            tw`px-6 py-3 rounded-lg`,
            !merchant || !amount || !currency || !receipt ? tw`bg-gray-300` : tw`bg-blue-600`,
          ]}
        >
          <Text style={tw`text-white font-bold`}>Create claim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateClaimPage;