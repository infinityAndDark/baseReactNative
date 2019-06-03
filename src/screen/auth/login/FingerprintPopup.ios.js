import React, { Component, PropTypes } from "react";
import FingerprintScanner from "react-native-fingerprint-scanner";
import Context from "context";

class FingerprintPopup extends Component {
  componentDidMount() {
    FingerprintScanner.authenticate({
      description: Context.getString("login_fingerprint_guide")
    })
      .then(() => {
        this.props.handlePopupDismissed("OK");
      })
      .catch(error => {
        this.props.handlePopupDismissed(error);
      });
  }

  render() {
    return false;
  }
}

export default FingerprintPopup;
