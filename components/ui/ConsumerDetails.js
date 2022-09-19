import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ConsumerDetailsTile = ({
  onPress,
  bgColor,
  borderColor,
  titleColor,
  houseNum,
  firstName,
  lastName,
  onDelete,
}) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: bgColor, borderColor: borderColor },
      ]}
    >
      <View>
        <View style={[styles.titleContainer]}>
          <Pressable onPress={onPress}>
            <Text style={[styles.titleText, { color: "black" }]}>
              {firstName + " " + lastName}
            </Text>
          </Pressable>
        </View>
        <View>
          <Text>H. No.: {houseNum}</Text>
        </View>
      </View>
      <View>
        <Pressable onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default ConsumerDetailsTile;

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    marginTop: 2,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 4,
    elevation: 4,
    height: 65,
    flexDirection: "row",
    borderWidth: 1,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
