import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Context from "context";
import { BaseScreen, Button, HandleBack, ModalConfirm } from "component";
import Util from "util";

export default class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      modalLogoutVisible: false,
      modalExitVisible: false
    };
  }
  goToMain = () => {
    this.props.navigation.navigate("MainFlow");
  };
  goToLogin = () => {
    this.props.navigation.navigate("AuthFlow");
  };
  showModalLogout = () => {
    this.setState({
      ...this.state,
      modalLogoutVisible: true
    });
  };
  hideModalLogout = () => {
    this.setState({
      ...this.state,
      modalLogoutVisible: false
    });
  };
  showModalExit = () => {
    this.setState({
      ...this.state,
      modalExitVisible: true
    });
  };
  hideModalExit = () => {
    this.setState({
      ...this.state,
      modalExitVisible: false
    });
  };
  exitApp = () => {
    this.hideModalExit();
    Util.App.exitApp();
  };
  logout = () => {
    this.hideModalLogout();
    this.props.logout();
  };
  componentDidUpdate() {
    if (!this.props.isLogin) {
      this.goToLogin();
    }
  }
  onBackPress = () => {
    this.showModalExit();
    return true;
  };
  render() {
    return (
      <HandleBack onBack={this.onBackPress}>
        <View style={styles.container}>
          <Button
            style={styles.button}
            title={Context.getString("home_button_logout")}
            onPress={this.showModalLogout}
          />
          <ModalConfirm
            content={Context.getString("home_logout_question")}
            acceptText={Context.getString("home_button_logout")}
            isVisible={this.state.modalLogoutVisible}
            onAccept={this.logout}
            onCancel={this.hideModalLogout}
          />
          <ModalConfirm
            content={Context.getString("app_exit_question")}
            isVisible={this.state.modalExitVisible}
            onAccept={this.exitApp}
            onCancel={this.hideModalExit}
          />
        </View>
      </HandleBack>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Context.getColor("background")
  },
  button: { marginTop: 50 }
});
