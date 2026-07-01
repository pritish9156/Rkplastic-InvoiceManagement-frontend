import axios from "axios";

const API =
"http://localhost:8080/Rkplastic-InvoiceManagement/api/customers";

export const getAllCustomers =
() => axios.get(`${API}/all`);

export const createCustomer =
(data) => axios.post(API,data);

export const searchCustomers =
(keyword) =>
axios.get(
`${API}/search?keyword=${keyword}`
);

export const getCustomer =
(id) =>
axios.get(`${API}/${id}`);

export const updateCustomer =
(id,data) =>
axios.put(`${API}/${id}`,data);

export const deleteCustomer =
(id) =>
axios.delete(`${API}/${id}`);