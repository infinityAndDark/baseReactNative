import React, { Component } from "react";
import { SafeAreaView, Keyboard } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Context from "context";
import Router from "src/Router";
import FlashMessage, {
  showMessage,
  hideMessage
} from "react-native-flash-message";

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    Context.application = this;
    Context.setLanguage(this.props.language);
  }
  showLoading = () => {
    this.setState({ isLoading: true });
  };
  hideLoading = () => {
    this.setState({ isLoading: false });
  };
  changeLanguage = key => {
    Context.setLanguage(key);
    this.props.changeLanguage(key);
    this.hideMsg();
    Keyboard.dismiss();
  };
  showMsg = (message, type) => {
    let duration = 1000 + (message.length / 20) * 1000;
    if (duration < 3000) duration = 3000;
    showMessage({
      // message: Context.getString("message_title_notify"),
      message: message,
      type: type ? type : "success",
      duration: duration,
      icon: type ? type : "info"
    });
  };
  hideMsg = () => {
    hideMessage();
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Spinner
          textContent={Context.getString("app_loading")}
          textStyle={{
            color: Context.getColor("textWhite"),
            fontWeight: "normal",
            fontSize: Context.style.font.medium
          }}
          color={Context.getColor("primary")}
          overlayColor={"rgba(0, 0, 0, 0.6)"}
          visible={this.state.isLoading}
        />
        <Router ref="router" />
        <FlashMessage position="top" />
      </SafeAreaView>
    );
  }
}
