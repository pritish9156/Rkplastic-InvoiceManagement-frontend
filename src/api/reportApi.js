import axios from "axios";

const BASE_URL =
    "https://rkplastic-backend.onrender.com/api/reports";

const api = axios.create({

    baseURL: BASE_URL

});

// Dashboard

export const getDashboardReport = () =>

    api.get("/dashboard");


// GST Summary

export const getGSTSummary = () =>

    api.get("/gst");


// All Reports

export const getAllReports = () =>

    api.get("/all");


// Date Range

export const getInvoicesBetweenDates = (

    start,

    end

) =>

    api.get(

        `/date-range?start=${start}&end=${end}`

    );


// Download All PDF

export const downloadAllPdf = () => {

    const link = document.createElement("a");

    link.href = `${BASE_URL}/download/all-pdf`;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};


// Download Date Range PDF

export const downloadDatePdf = (start, end) => {

    if (!start || !end) {

        alert("Please select Start Date & End Date");

        return;

    }

    const link = document.createElement("a");

    link.href =
        `${BASE_URL}/download/date-pdf?start=${start}&end=${end}`;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};


// Download Excel

export const downloadExcel = () => {

    const link = document.createElement("a");

    link.href = `${BASE_URL}/download/excel`;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};

export const getMonthlySales = () =>

    api.get("/monthly");