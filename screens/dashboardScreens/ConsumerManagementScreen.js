import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import NewConsumerDetails from "../../components/ui/NewConsumerDetails";
import ConsumerDetailsTile from "../../components/ui/ConsumerDetails";
import AppLoading from "expo-app-loading";
import {
  fetchConsumerData,
  storeConsumerData,
  deleteConsumerData,
} from "../../util/http";
// import QRCode from "react-native-qrcode";

const ConsumerManagementScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    houseNum: "",
    street: "",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [userList, setUserList] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [fetchedConsumerDetails, setFetchedConsumerDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  if (!isLoaded) {
    <AppLoading />;
  }

  fetchConsumerData();

  //TO PASS STATE AND CITY
  function getLocation(city, state) {
    setUserDetails((prevValue) => {
      return { ...prevValue, state: state, city: city };
    });
  }

  //TO PASS OTHER USER DETAILS
  function userDetailsHandler(inputType, enteredValue) {
    setUserDetails((prevValue) => {
      return {
        ...prevValue,
        [inputType]: enteredValue,
      };
    });
  }

  //TO GET USER INPUT SCREEN
  function startAddingUser() {
    setModalIsVisible(true);
  }

  //TO REMOVE USER INPUT SCREEN
  function removeModal() {
    setModalIsVisible(false);
  }

  //TO ADD CONSUMER DETAILS TO DATABASE
  function addNewUser() {
    storeConsumerData(userDetails);
    setUserDetails({
      firstName: "",
      lastName: "",
      houseNum: "",
      street: "",
      landmark: "",
      state: "",
      city: "",
      pincode: "",
    });
    removeModal();
  }

  //TO GET CONSUMER DETAILS FROM DATABASE
  useEffect(() => {
    async function getConsumerDetails() {
      const allConsumerDetails = await fetchConsumerData();
      setFetchedConsumerDetails(allConsumerDetails.reverse());
    }
    getConsumerDetails();
  }, [userDetails, deleteConsumerData]);
  //TO SHOW RENDERED DATA ON SCREEN
  function renderFetchedDetails(itemData) {
    function showDetailedInfo() {
      navigation.navigate("FullConsumerData", { userInfo: itemData.item });
    }
    return (
      <ConsumerDetailsTile
        firstName={itemData.item.firstName}
        lastName={itemData.item.lastName}
        houseNum={itemData.item.houseNum}
        onPress={showDetailedInfo}
        onDelete={deleteConsumerData.bind(itemData.item.id)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputUser}>
        <View style={styles.add}>
          <Button onPress={startAddingUser}>Add New User</Button>
        </View>
        <NewConsumerDetails
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
          getLocation={getLocation}
        />
      </View>
      <View style={styles.showUser}>
        <FlatList
          data={fetchedConsumerDetails}
          keyExtractor={(item) => item.id}
          renderItem={renderFetchedDetails}
        />
      </View>
    </View>
  );
};

export default ConsumerManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 30,
  },
  inputUser: {
    // flex: 1,
  },
  showUser: {
    flex: 1,
    marginTop: 20,
  },
});
