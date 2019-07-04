import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Context from "context";
import { BaseScreen, Button, HandleBack, ModalConfirm } from "component";
import Util from "util";
import LocalStorage from "middleware/helper/LocalStorage";

export default class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      modalLogoutVisible: false,
      modalExitVisible: false,
      token: ""
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

  componentDidMount() {
    this.getToken();
  }
  async getToken() {
    try {
      await LocalStorage.saveToken("NGUYEN DANG THO");
      let value = await LocalStorage.getToken();
      this.setState({
        token: value
      });
    } catch (e) {
      this.setState({
        token: JSON.stringify(e)
      });
    }
  }

  render() {
    return (
      <HandleBack onBack={this.onBackPress}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>{this.state.token}</Text>
          </View>
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
    backgroundColor: Context.getColor("background")
  },
  FlatList_Item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  header_footer_style: {
    width: "100%",
    height: 44,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center"
  },
  button: { margin: 50 }
});
