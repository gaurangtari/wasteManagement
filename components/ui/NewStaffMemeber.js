import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";
import Input from "../../components/Auth/Input";
import { Colors } from "../../constants/styles";
import Button from "./Button";
import FlatButton from "./FlatButton";
import { location } from "../../constants/locationData";
import { ScrollView } from "react-native-gesture-handler";
import DropDown from "./DropDown";

const NewStaffMember = ({
  visible,
  userDetailsHandler,
  firstName,
  lastName,
  houseNum,
  street,
  landmark,
  userLocationNStaffType,
  pincode,
  addNewUser,
  removeModal,
}) => {
  const stateArray = [];

  location.map((item) => stateArray.push(item.state));
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const staffArray = ["Management Staff", "Cleaning Staff"];

  const [showCityBol, setShowCityBol] = useState(false);

  function userLocation(event) {
    (event === "state" && showCityBol === false) || selectedState === ""
      ? setShowCityBol(!showCityBol)
      : setShowCityBol(showCityBol);
    var index = location.findIndex((item) => item.state === selectedState);
    setCityArray(location[index].cities);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputHeadingText}>Personal Details</Text>
            <View>
              <Input
                label="First Name"
                style={styles.input}
                onUpdateValue={userDetailsHandler.bind(this, "firstName")}
                value={firstName}
              />
              <Input
                label="Last Name"
                onUpdateValue={userDetailsHandler.bind(this, "lastName")}
                value={lastName}
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputHeadingText}>Address</Text>
            <Input
              label="H. No."
              style={styles.input}
              onUpdateValue={userDetailsHandler.bind(this, "houseNum")}
              value={houseNum}
            />
            <Input
              label="Street/Locality"
              style={styles.input}
              onUpdateValue={userDetailsHandler.bind(this, "street")}
              value={street}
            />
            <Input
              label="Landmark"
              style={styles.input}
              onUpdateValue={userDetailsHandler.bind(this, "landmark")}
              value={landmark}
            />
            <DropDown
              label="State"
              setSelected={setSelectedState}
              data={stateArray}
              placeholder="Select State"
              onSelect={userLocation.bind(this, "state")}
            />
            {showCityBol ? (
              <DropDown
                label="City"
                setSelected={setSelectedCity}
                data={cityArray}
                placeholder="Select City"
              />
            ) : null}

            <Input
              label="Pin-Code"
              style={styles.input}
              onUpdateValue={userDetailsHandler.bind(this, "pincode")}
              value={pincode}
            />
            <DropDown
              label="Staff"
              setSelected={setSelectedStaff}
              data={staffArray}
              onSelect={userLocationNStaffType.bind(
                this,
                selectedState,
                selectedCity,
                selectedStaff
              )}
            />
          </View>

          <Button onPress={addNewUser}>Add</Button>
          <FlatButton onPress={removeModal}>Cancel</FlatButton>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NewStaffMember;

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
