import { connect } from "react-redux";
import * as Actions from "./action";
import HomeScreen from "./screen";
import getHomeState from "./selector";
const mapStateToProps = state => getHomeState(state);
export default connect(
  mapStateToProps,
  Actions
)(HomeScreen);
