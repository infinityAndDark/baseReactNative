import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
export default class MyTextInput extends Component {
  render() {
    let inputProps = { ...this.props, style: undefined };
    return (
      <View style={this.props.style}>
        <TextInput
          ref={input => {
            this.input = input;
          }}
          {...inputProps}
          style={{
            paddingBottom: 2,
            color: this.props.textColor,
            fontSize: 17
          }}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : "default"
          }
        />
        <View style={{ height: 1, backgroundColor: this.props.lineColor }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  line: {
    height: 1
  }
});
