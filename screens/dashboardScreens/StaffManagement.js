import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../../components/ui/Button";
import NewStaffMember from "../../components/ui/NewStaffMemeber";
import { storeStaffData } from "../../util/http";

const StaffManagement = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    houseNum: "",
    street: "",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
    typeOfStaff: "",
  });

  function userLocationNStaffType(city, state, staffType) {
    setUserDetails((prevValue) => {
      return {
        ...prevValue,
        state: state,
        city: city,
        staffType: staffType,
      };
    });
  }

  function addNewUser() {
    storeStaffData(userDetails);
    //data to be submitted to database
    setUserDetails({
      firstName: "",
      lastName: "",
      houseNum: "",
      street: "",
      landmark: "",
      state: "",
      city: "",
      pincode: "",
      staffType: "",
    });
    removeModal();
  }

  function userDetailsHandler(inputType, enteredValue) {
    setUserDetails((prevValue) => {
      return {
        ...prevValue,
        [inputType]: enteredValue,
      };
    });
  }
  function startAddingUser() {
    setModalIsVisible(true);
  }
  function removeModal() {
    setModalIsVisible(false);
  }
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputUser}>
        <View style={styles.add}>
          <Button onPress={startAddingUser}>Add Staff</Button>
        </View>
        <NewStaffMember
          visible={modalIsVisible}
          userDetailsHandler={userDetailsHandler}
          firstName={userDetails.firstName}
          houseNum={userDetails.houseNum}
          lastName={userDetails.lastName}
          street={userDetails.street}
          landmark={userDetails.landmark}
          state={userDetails.state}
          city={userDetails.city}
          pincode={userDetails.pincode}
          addNewUser={addNewUser}
          removeModal={removeModal}
          userLocationNStaffType={userLocationNStaffType}
        />
      </View>
    </View>
  );
};

export default StaffManagement;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});
