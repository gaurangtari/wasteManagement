import { StyleSheet, Text, View, Modal, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import React, { useState } from "react";
import Input from "../Auth/Input";
import Button from "./Button";

import DropDown from "./DropDown";
import FlatButton from "./FlatButton";
import { location } from "../../constants/locationData";
const EditConsumerDetails = ({
  firstName,
  lastName,
  houseNum,
  landmark,
  street,
  state,
  city,
  pincode,
  visible,
  removeModal,
  addEdittedData,
}) => {
  const [currentDetails, setCurrentDetails] = useState({
    firstName: firstName,
    lastName: lastName,
    houseNum: houseNum,
    landMark: landmark,
    street: street,
    state: state,
    city: city,
    pincode: pincode,
  });

  const stateArray = [];
  location.map((item) => stateArray.push(item.state));

  const [selectedState, setSelectedState] = useState(currentDetails.state);
  const [selectedCity, setSelectedCity] = useState(currentDetails.city);
  const [cityArray, setCityArray] = useState([]);

  function userLocation(event) {
    var index = location.findIndex((item) => item.state === selectedState);
    setCityArray(location[index].cities);
  }

  function newUserDetails(inputType, enteredValue) {
    setCurrentDetails((prevValue) => {
      return {
        ...prevValue,
        [inputType]: enteredValue,
      };
    });
  }
  function getLocation(city, state) {
    setCurrentDetails((prevValue) => {
      return { ...prevValue, state: state, city: city };
    });
  }

  return (
    <View>
      <Modal visible={visible} animationType="slide">
        <ScrollView>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputHeadingText}>Personal Details</Text>
              <View>
                <Input
                  label="First Name"
                  style={styles.input}
                  onUpdateValue={newUserDetails.bind(this, "firstName")}
                  value={currentDetails.firstName}
                />
                <Input
                  label="Last Name"
                  onUpdateValue={newUserDetails.bind(this, "lastName")}
                  value={currentDetails.lastName}
                />
              </View>
            </View>

            <View>
              <Text style={styles.inputHeadingText}>Address</Text>
              <Input
                label="H. No."
                style={styles.input}
                onUpdateValue={newUserDetails.bind(this, "houseNum")}
                value={currentDetails.houseNum}
              />
              <Input
                label="Street/Locality"
                style={styles.input}
                onUpdateValue={newUserDetails.bind(this, "street")}
                value={currentDetails.street}
              />
              <Input
                label="Landmark"
                style={styles.input}
                onUpdateValue={newUserDetails.bind(this, "landmark")}
                value={currentDetails.landmark}
              />
              <DropDown
                label="State"
                setSelected={setSelectedState}
                data={stateArray}
                placeholder="Select State"
                onSelect={userLocation.bind(this, "state")}
              />

              <DropDown
                label="City"
                setSelected={setSelectedCity}
                data={cityArray}
                placeholder="Select City"
                onSelect={getLocation.bind(this, selectedCity, selectedState)}
              />

              <Input
                label="Pin-Code"
                style={styles.input}
                onUpdateValue={newUserDetails.bind(this, "pincode")}
                value={pincode}
              />
            </View>

            <Button onPress={addEdittedData}>Add</Button>
            <FlatButton onPress={removeModal}>Cancel</FlatButton>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default EditConsumerDetails;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.primary800,
    marginTop: 50,
    marginHorizontal: 30,
    padding: 30,
    borderRadius: 7,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  inputHeadingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
  },
});
