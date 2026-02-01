import { axiosInstance } from "./client";

const postData = async (url, data, withCredentials) => {
  const result = await axiosInstance()
    .post(url, data, { withCredentials })
    .then((res) => {
      console.log("res", res);
      if (res.status === 401) {
        window.location.href = "/login";
      }
      return res;
    })
    .catch((err) => err.response);
  return result;
};

const putData = async (url, data, withCredentials) => {
  const result = await axiosInstance()
    .put(url, data, { withCredentials })
    .then((res) => {
      console.log("res", res);
      if (res.status === 401) {
        window.location.href = "/login";
      }
      return res;
    })
    .catch((err) => err.response);
  return result;
};

const patchData = async (url, data, withCredentials) => {
  const result = await axiosInstance()
    .patch(url, data, { withCredentials })
    .then((res) => {
      console.log("res", res);
      if (res.status === 401) {
        window.location.href = "/login";
      }
      return res;
    })
    .catch((err) => err.response);
  return result;
};

const deleteData = async (url, withCredentials, params) => {

  const result = await axiosInstance()
    .delete(url, { withCredentials, params })
    .then((res) => {
      if (res.status === 401) {
        window.location.href = "/login";
      }
      return res;
    })
    .catch((err) => err.response);
  return result;
};

const postMultipartData = async (url, data, withCredentials) => {
  const result = await axiosInstance()
    .put(url, data, { withCredentials })
    .then((res) => res.data)
    .catch((err) => err.response);
  return result;
};

export const mutationRequest = (
  url,
  type = "post",
  data,
  withCredentials = false,
  params = null
) => {
  switch (type.toLowerCase()) {
    case "post":
      return postData(url, data, withCredentials);
    case "put":
      return putData(url, data, withCredentials);
    case "patch":
      return patchData(url, data, withCredentials);
    case "delete":
      return deleteData(url, withCredentials, params);
    case "data":
      return postMultipartData(url, data, withCredentials);
    default:
      return postData(url, data, withCredentials);
  }
};
