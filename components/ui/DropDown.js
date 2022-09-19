import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectList from "react-native-dropdown-select-list";

const DropDown = ({ label, data, setSelected, placeholder, onSelect }) => {
  return (
    <View>
      <Text>{label}</Text>
      <SelectList
        data={data}
        boxStyles={{
          borderRadius: 4,
          backgroundColor: "white",
          borderWidth: 0.25,
        }}
        dropdownStyles={{
          borderRadius: 4,
          marginTop: 0,
          backgroundColor: "white",
        }}
        setSelected={setSelected}
        searchicon={<Text></Text>}
        search={false}
        placeholder={placeholder}
        onSelect={onSelect}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({});
