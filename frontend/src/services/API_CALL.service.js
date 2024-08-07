import axios from "axios";

const API_BASE_URL = `http://192.168.0.104:3000`;

export const APILogin = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/login`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

// get
export const APIGetAlat = (cb) => {
  axios
    .get(`${API_BASE_URL}/alat/alat`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetAlatByName = (id, cb) => {
  axios
    .get(`${API_BASE_URL}/alat/alat/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetAlatDipakai = (cb) => {
  axios
    .get(`${API_BASE_URL}/alat/dipakaialat`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetAlatExtra = (id, cb) => {
  axios
    .get(`${API_BASE_URL}/alat/extra/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetService = (cb) => {
  axios
    .get(`${API_BASE_URL}/alat/servicealat`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
// post
export const APITambahAlat = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/alat/tambahalat`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APITambahPakai = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/alat/dipakaialat`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APITambahService = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/alat/servicealat`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
// delete
export const APIBatalkanPakai = (alat, pakai, cb) => {
  axios
    .delete(`${API_BASE_URL}/alat/batalkanpakai/${alat}/${pakai}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIHapusAlatById = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/alat/hapusalat/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIHapusRiwayatPakai = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/alat/riwayatpakai/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIHapusRiwayatService = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/alat/riwayatservice/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIBatalkanService = (alat, service, cb) => {
  axios
    .delete(`${API_BASE_URL}/alat/batalkanservice/${alat}/${service}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

export const APILogout = (cb) => {
  axios
    .delete(`${API_BASE_URL}/logout`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

export const APIHapusAlat = (token, cb) => {
  axios
    .delete(`${API_BASE_URL}/alat/hapusalat`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
// update
export const APISelesaiPakai = (alat, pakai, cb) => {
  axios
    .patch(`${API_BASE_URL}/alat/selesaipakai/${alat}/${pakai}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APISelesaiService = (alat, pakai, cb) => {
  axios
    .patch(`${API_BASE_URL}/alat/selesaikanservice/${alat}/${pakai}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
