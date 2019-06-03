import React, { Component, PropTypes } from "react";
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";
import Context from "context";
import FingerprintScanner from "react-native-fingerprint-scanner";

import ShakingText from "component/ShakingText";
import styles from "./FingerprintPopup.style";

class FingerprintPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  componentDidMount() {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttempted
    })
      .then(() => {
        this.props.handlePopupDismissed("OK");
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = error => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };

  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>
          <Image
            style={styles.logo}
            source={Context.getImage("fingerprintModal")}
          />
          <ShakingText
            ref={instance => {
              this.description = instance;
            }}
            style={styles.description(!!errorMessage)}
          >
            {errorMessage || Context.getString("login_fingerprint_guide")}
          </ShakingText>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissed}
          >
            <Text style={styles.buttonText}>
              {Context.getString("login_fingerprint_cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// FingerprintPopup.propTypes = {
//   style: ViewPropTypes.style,
//   handlePopupDismissed: PropTypes.func.isRequired,
// };

export default FingerprintPopup;
