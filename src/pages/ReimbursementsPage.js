import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, SafeAreaView } from "react-native";
import ReimbursementItem from "../components/ReimbursementItem";
import EmptyState from "../components/EmptyState";
import FloatingButton from "../components/FloatingButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import REIMBURSEMENTS from "../constants/reimbursements";
import tw from "tailwind-react-native-classnames";

const ReimbursementsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reimbursements, setReimbursements] = useState(REIMBURSEMENTS);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.newClaim) {
      setReimbursements((prevClaims) => [route.params.newClaim, ...prevClaims]);
    }
  }, [route.params?.newClaim]);

  const filteredData = reimbursements.filter((item) =>
    item.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`text-2xl font-bold p-4`}>Reimbursement</Text>

      <TextInput
        style={tw`mx-4 p-3 border border-gray-300 rounded-lg mb-3`}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReimbursementItem item={item} />}
          contentContainerStyle={tw`pb-20`}
        />
      ) : (
        <EmptyState />
      )}

      <FloatingButton onPress={() => navigation.navigate("CreateClaim")} />
    </SafeAreaView>
  );
};

export default ReimbursementsPage;