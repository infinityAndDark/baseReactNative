import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Context from "context";
import { Button } from "component";
import Modal from "react-native-modal";

export default class ModalConfirm extends Component {
  render() {
    let title = this.props.title
      ? this.props.title
      : Context.getString("modal_title_default");
    let cancelText = this.props.cancelText
      ? this.props.cancelText
      : Context.getString("modal_button_cancel_default");
    let acceptText = this.props.acceptText
      ? this.props.acceptText
      : Context.getString("modal_button_ok_default");
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.50}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        onBackButtonPress={this.props.onCancel}
        {...this.props}
      >
        <View style={[styles.container, this.props.containerStyle]}>
          <Text style={[styles.title, this.props.titleStyle]}>{title}</Text>
          <View style={styles.line} />
          <Text style={[styles.content, this.props.contentStyle]}>
            {this.props.content}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              type={
                this.props.cancelType ? this.props.cancelType : "cancel"
              }
              style={{ height: 36, marginRight: 8 }}
              contentStyle={styles.buttonCancel(cancelText)}
              title={cancelText}
              lowerCase={true}
              onPress={this.props.onCancel}
            />
            <Button
              style={{ height: 36 }}
              contentStyle={styles.buttonAccept(acceptText)}
              title={acceptText}
              lowerCase={true}
              onPress={this.props.onAccept}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignContent: "center",
    alignSelf: "center",
    width: "90%",
    justifyContent: "center",
    backgroundColor: Context.getColor("background"),
    borderRadius: 7
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 4,
    color: Context.getColor("text")
  },
  line: {
    height: 1,
    backgroundColor: Context.getColor("primary")
  },
  content: {
    fontSize: 17,
    color: Context.getColor("text"),
    marginTop: 12
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30
  },
  buttonCancel: text => {
    let paddingLeft = 15;
    let paddingRight = 15;
    if (text && text.length < 4) {
      paddingLeft = 25;
      paddingRight = 25;
    }
    return {
      paddingLeft: paddingLeft,
      paddingRight: paddingRight
    };
  },
  buttonAccept: text => {
    let paddingLeft = 15;
    let paddingRight = 15;
    if (text && text.length < 4) {
      paddingLeft = 25;
      paddingRight = 25;
    }
    return { paddingLeft: paddingLeft, paddingRight: paddingRight };
  }
});
