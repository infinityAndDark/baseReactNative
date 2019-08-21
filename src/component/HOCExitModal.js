import React from "react";
import Util from "util";
import Context from "context";
import { ModalConfirm } from "component";

const withExitModal = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        modalExitVisible: false
      };
    }
    showModal = () => {
      this.setState({
        modalExitVisible: true
      });
    };
    closeModal = () => {
      this.setState({
        modalExitVisible: false
      });
    };
    exitApp = () => {
      this.hideModalExit();
      Util.App.exitApp();
    };
    render() {
      return (
        <React.Fragment>
          <WrappedComponent showModalExit={this.showModal} />
          {this.state.modalExitVisible ? (
            <ModalConfirm
              content={Context.getString("app_exit_question")}
              isVisible={this.state.modalExitVisible}
              onAccept={this.exitApp}
              onCancel={this.closeModal}
            />
          ) : null}
        </React.Fragment>
      );
    }
  };
};

export default withExitModal;
