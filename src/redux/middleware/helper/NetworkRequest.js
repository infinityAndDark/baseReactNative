import axios from "axios";
export default class NetworkRequest {
  static Method = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
  };
  constructor(host) {
    this.createInstance(host);
    this.request = this.request.bind(this);
  }
  setHandleResponse(handler) {
    this.handleSuccessResponse = handler;
  }
  createInstance(host) {
    let _instance = axios.create({
      baseURL: host,
      timeout: 10000,
      responseType: "json",
      data: {},
      headers: {
        "Content-Type": "application/json",
        common: {
          "Content-Type": "application/json"
        },
        get: {
          "Content-Type": "application/json"
        },
        post: {
          "Content-Type": "application/json"
        },
        put: {
          "Content-Type": "application/json"
        },
        delete: {
          "Content-Type": "application/json"
        }
      }
    });
    // Add a request interceptor
    _instance.interceptors.request.use(
      config => {
        // Do something before request is sent
        console.log({
          method: config.method,
          host: config.baseURL,
          url: config.url,
          headers: config.headers,
          body: { ...config.data, ...config.params }
        });
        return config;
      },
      function(error) {
        // Do something with request error
        console.log(error);
        return Promise.reject(error);
      }
    );
    this.instance = _instance;
  }

  createRequestOption(method, url, params, header, moreOption) {
    let option = { method: method, url: url };
    if (params) {
      if (method === Method.POST) {
        option = { ...option, data: params };
      } else {
        option = { ...option, params: params };
      }
    }
    if (header) option = { ...option, header: { ...option.header, header } };
    if (moreOption) option = { ...option, ...moreOption };
    return option;
  }
  createErrorResponse(status, message) {
    if (status == 0) {
      status = 501;
      message = "No internet connection!";
    }
    if (!status || status === 500) status = 500;
    if (!message) message = "Something went wrong!";
    return { status: status, message: message };
  }

  createSuccessResponse(status, message, response) {
    let result = { status: status, message: message, data: response };
    if (this.handleSuccessResponse)
      return { ...result, ...this.handleSuccessResponse(response) };
    else return result;
  }

  makeRequest(option) {
    let self = this;
    return self.instance
      .request(option)
      .then(response => {
        console.log({ status: response.status, data: response.data });
        if (response.data == undefined || response.data == null)
          return Promise.reject(self.createErrorResponse(500));
        return Promise.resolve(
          self.createSuccessResponse(
            response.status,
            response.statusText,
            response.data
          )
        );
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return Promise.reject(
            self.createErrorResponse(error.response.status, error.response.data)
          );
        } else if (error.request) {
          console.log(error.request);
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return Promise.reject(self.createErrorResponse(error.request.status));
        } else {
          console.log(error);
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
          return Promise.reject(self.createErrorResponse(500, error.message));
        }
      });
  }

  async request(method, url, params, header, moreOption) {
    let option = await this.createRequestOption(
      method,
      url,
      params,
      header,
      moreOption
    );
    return await this.makeRequest(option);
  }
}
