import axios from "axios";

export let createHeadersList = (headersOptions = {}) => ({
  Accept: "*/*",
  ...headersOptions,
});

export let getReqOptionsFactoty = ({ baseUrl, headersList }) => {
  return ({ url, method, data }) => ({
    url: `${baseUrl}/${url}`,
    method,
    headers: headersList,
    data,
  });
};

export const apiCall = async (reqOptions) => {
  console.log(reqOptions)
  try {
    let response = await axios.request(reqOptions);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response?.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("General Error:", error.message);
    }

    throw new Error(error);
  }
};
