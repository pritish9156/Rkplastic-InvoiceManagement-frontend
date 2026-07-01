import axios from "axios";

const API =
"http://192.168.0.100/Rkplastic-InvoiceManagement/api/bills";

export const getNextBillNo =
() =>
axios.get(
`${API}/next-bill-no`
);

export const createInvoice =
(data) =>
axios.post(
API,
data
);

export const getAllInvoices =
() =>
axios.get(
`${API}/all`
);

export const getInvoice =
(id) =>
axios.get(
`${API}/${id}`
);

export const deleteInvoice =
(id) =>
axios.delete(
`${API}/${id}`
);

export const updateInvoice =
(id,data) =>
axios.put(
`${API}/${id}`,
data
);

export const downloadPdf =
(id) =>
`${API}/${id}/pdf`;