import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

import Dashboard
from "./pages/Dashboard";

import CreateInvoice
from "./pages/CreateInvoice";

import InvoiceList
from "./pages/InvoiceList";

import InvoiceView
from "./pages/InvoiceView";

import EditInvoice
from "./pages/EditInvoice";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";

function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route
      path="/"
      element={<Dashboard />}
    />

    <Route
      path="/invoice/create"
      element={<CreateInvoice />}
    />

    <Route
      path="/invoices"
      element={<InvoiceList />}
    />

    <Route

      path="/invoice/:id"

      element={
      <InvoiceView/>
      }

    />

    <Route

      path="/invoice/edit/:id"

      element={
      <EditInvoice/>
      }

      />

      <Route

      path="/customers"

      element={
      <Customers/>
      }

      />

      <Route
          path="/reports"
          element={<Reports />}
      />

   </Routes>


  </BrowserRouter>

 );
}

export default App;