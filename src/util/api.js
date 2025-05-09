import axios from "./interceptor";
const baseUrl = "https://comfortcargoservices.site/api/v1";

const sendNotification = async (payload) => {
  return await axios
    .post(`${baseUrl}/nhrc`, payload)
    .then((response) => response.data);
};
const register = async (payload) => {
  return await axios
    .post(`${baseUrl}/register-nhrc`, payload)
    .then((response) => response.data);
};
const loginUser = async (payload) => {
  return await axios
    .post(`${baseUrl}/login-nhrc`, payload)
    .then((response) => response.data);
};
const nhrcRequest = async (payload) => {
  return await axios
    .post(`${baseUrl}/nhrc-request`, payload)
    .then((response) => response.data);
};
const payslipRequest = async () => {
  return await axios
    .get(`${baseUrl}/all-payslip-requests`)
    .then((response) => response.data);
};
const getEmolumentRequest = async () => {
  return await axios
    .get(`${baseUrl}/all-emolument-requests`)
    .then((response) => response.data);
};
const nhrcRequestUpdate = async (payload) => {
  return await axios
    .post(`${baseUrl}/nhrc-update-request`, payload)
    .then((response) => response.data);
};
const nhrcEmolumentUpdate = async (payload) => {
  return await axios
    .post(`${baseUrl}/nhrc-update-emolument-request`, payload)
    .then((response) => response.data);
};
const nhrcEmolumentRequest = async () => {
  return await axios
    .get(`${baseUrl}/nhrc-emolument-request`)
    .then((response) => response.data);
};
const nhrcAllUsers = async () => {
  return await axios
    .get(`${baseUrl}/nhrc-all-users`)
    .then((response) => response.data);
};
const sendEmolument = async (payload) => {
  return await axios
    .post(`${baseUrl}/nhrc-emolument-email`, payload)
    .then((response) => response.data);
};
const addDevice = async (payload) => {
  return await axios
    .post(`${baseUrl}/add-device`, payload)
    .then((response) => response.data);
};
const listDevices = async () => {
  return await axios
    .get(`${baseUrl}/all-devices`)
    .then((response) => response.data);
};
const assignDevice = async (payload) => {
  return await axios
    .post(`${baseUrl}/assign-device`, payload)
    .then((response) => response.data);
};
const getAllAssignedDevices = async () => {
  return await axios
    .get(`${baseUrl}/all-assigned-devices`)
    .then((response) => response.data);
};
const getAllFilteredAssignedDevices = async () => {
  return await axios
    .get(`${baseUrl}/assigned-devices-filtered`)
    .then((response) => response.data);
};

export {
  sendNotification,
  register,
  loginUser,
  nhrcAllUsers,
  nhrcEmolumentRequest,
  nhrcEmolumentUpdate,
  nhrcRequest,
  nhrcRequestUpdate,
  sendEmolument,
  payslipRequest,
  getEmolumentRequest,
  addDevice,
  listDevices,
  getAllAssignedDevices,
  getAllFilteredAssignedDevices,
  assignDevice
};
