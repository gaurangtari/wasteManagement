import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-ionicons";

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import EditConsumerDetails from "../../../components/ui/EditConsumerDetails";

const FullConsumerInfoScreen = ({ route }) => {
  const {
    city,
    firstName,
    houseNum,
    landmark,
    lastName,
    pincode,
    state,
    street,
  } = route.params.userInfo;

  const [showModal, setShowModal] = useState(false);
  function onEdit() {
    setShowModal(true);
  }
  function addEdittedData() {
    console.log(currentDetails);
    setShowModal(false);
  }
  return (
    <View styles={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={styles.headingText}>{firstName + " " + lastName}</Text>
        </View>
        <View>
          <Text>H. No./Flat No: {houseNum}</Text>
          <Text>
            {street}, {landmark},
          </Text>
          <Text>
            {city} - {state}
          </Text>
          <Text>{pincode}</Text>
        </View>
        <View>
          <Text style={styles.headingText}>QRCODE</Text>
        </View>
      </View>
      <View>
        <Pressable onPress={onEdit}>
          <Text style={styles.editText}>Edit...</Text>
        </Pressable>
      </View>
      {/* EDIT SCREEN */}
      <EditConsumerDetails
        firstName={firstName}
        lastName={lastName}
        houseNum={houseNum}
        landMark={landmark}
        street={street}
        state={state}
        city={city}
        pincode={pincode}
        visible={showModal}
        addEdittedData={addEdittedData}
        removeModal={removeModal}
      />
    </View>
  );
};

export default FullConsumerInfoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
  },
  container: {
    margin: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
