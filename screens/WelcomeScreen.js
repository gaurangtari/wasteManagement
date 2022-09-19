import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

import InfoTile from "../components/ui/InfoTile";

function WelcomeScreen({ navigation }) {
  const [fetchedMessage, setFetchedMesssage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        "https://react-native-course-3cceb-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setFetchedMesssage(response.data);
      });
  }, [token]);

  return (
    <>
      <View style={styles.rootContainer}>
        <View styles={styles.rowContainer}>
          <InfoTile
            cardTitle="Consumer Management"
            onPress={() => {
              navigation.navigate("ConsumerManagement");
            }}
            bgColor={"#cbf6f8"}
            borderColor={"#63cad8"}
          />
          <InfoTile
            cardTitle="Staff Management"
            onPress={() => {
              navigation.navigate("StaffManagement");
            }}
            bgColor={"#fcfc99"}
            borderColor={"#ffe135"}
          />
        </View>
        <View styles={styles.rowContainer}>
          <InfoTile
            cardTitle="Complaint/Service Management"
            onPress={() => {
              navigation.navigate("ComplaintServiceManagement");
            }}
            bgColor={"#79de79"}
            borderColor={"#28cc2d"}
          />
          <InfoTile
            cardTitle="Reports"
            onPress={() => {
              navigation.navigate("Report");
            }}
            bgColor={"#ccc"}
            borderColor={"#cccfff"}
          />
        </View>
      </View>
    </>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 32,
    flexDirection: "row",
    justifyContent: "center",
  },
  rowContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
