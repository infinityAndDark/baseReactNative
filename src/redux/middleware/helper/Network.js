import NetworkRequest from "./NetworkRequest";
import Config from "config";
const Method = NetworkRequest.Method;

const netRequest = new NetworkRequest(Config.HOST);
const request = netRequest.request;

netRequest.setHandleResponse(response => {
  return { message: "OK" };
});

const login = async (userName, password) => {
  return request(Method.GET, "200");
};

export default {
  login: login
};
