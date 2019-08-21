import NetworkRequest from "./NetworkRequest";
import Config from "config";
const Method = NetworkRequest.Method;

const netRequest = new NetworkRequest(Config.HOST);
const request = netRequest.request;

const getMessageFromCode=(code)=>{

  if(code==500) return "Something went wrong!";
  if(code==501) return "No internet connection!";

  if(code==1100) return "Name too long";
  if(code==1101) return "wrong email format";
  if(code==1102) return "wrong format phone number";
  if(code==1103) return "permanent_address too long";
  if(code==1104) return "invalid prefer_language";
  if(code==1105) return "email exist";
  if(code==1106) return "invalid id";
  if(code==1107) return "customer not found";
  if(code==1108) return "invalid email token";
  if(code==1109) return "Require Change Password";
  if(code==1110) return "invalid username or password";
  if(code==1111) return "invalid current password";
  if(code==1112) return "customer is exists";

  if(code==1200) return "empty uuid";
  if(code==1201) return "empty content";
  if(code==1203) return "empty name";
  if(code==1204) return "invalid role";
  if(code==1205) return "role is not exists";
  if(code==1206) return "uuid is not exists";
  if(code==1207) return "empty password";
  if(code==1208) return "invalid ou";

  if(code==1300) return "empty title";
  if(code==1301) return "title too long";
  if(code==1302) return "empty content_brief";
  if(code==1303) return "content_brief too long";
  if(code==1304) return "empty content";
  if(code==1305) return "content too long";
  if(code==1306) return "News is not exits";
}

const getHeaders = (token) => {
  let header = {
    "x-api-key": "aa86719bb53d3a8fc470210d7e7a1b4388da4fa2",
    "x-environment": "APP",
    "Content-Type": "application/json",
    "Accept-Language": "vi"
  };
  if(token) header["Authorization"]="Bearer "+token;
  return header;
};

netRequest.setHandleResponse(response => {
  return { message: "OK" };
});
netRequest.setHandleError((status, message) => {
  let code=message?message.payload?message.payload.code:500:500
  if(status==501) code=501;
  if(status==500) code=500;
  return { message: getMessageFromCode(code) };
});

const login = async (userName, password, isEncrypted) => {
  return request(
    Method.POST,
    "customer/sign_in",
    {
      payload: {
        username: "nthanhdo",
        password:
          "0Drbk24n/4HWSiyXaX7rtmhSrSISwyCcTZbvRFVAQk5OQNo0Lrc6knByoHeEuvdD4BTAmf9fJXaqp51OZCnjlmu2J9Nvu7fom3BHC1VeWtlT65vmUoMLLhvYChCaQUWuGtZk2srZgz1ulzQ3mnAh7ET9gZcWoHbwUVor2ZGHKUoU7VH/NmtJkkylKT6V/eAp",
        isEncryptPassword: true
      }
    },
    getHeaders()
  );
};

export default {
  login: login
};
