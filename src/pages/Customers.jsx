import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

import {

    getAllCustomers,
    updateCustomer,
    deleteCustomer

}
from "../api/customerApi";

import "../styles/customer.css"

function Customers() {

    const [

        customers,

        setCustomers

    ] = useState([]);

    const [

        search,

        setSearch

    ] = useState("");

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        saving,

        setSaving

    ] = useState(false);

    const [

        deleting,

        setDeleting

    ] = useState(null);

    const [

        editingCustomer,

        setEditingCustomer

    ] = useState(null);

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            setLoading(true);

            const response =

                await getAllCustomers();

            setCustomers(

                response.data

            );

        }

        catch {

            toast.error(

                "Failed to load customers."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const filteredCustomers =

        customers.filter(

            customer =>

                customer.name

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        );

    const handleDelete =

        async(id)=>{

            const confirmDelete=

                window.confirm(

                    "Delete this customer?"

                );

            if(!confirmDelete)

                return;

            try{

                setDeleting(id);

                await deleteCustomer(id);

                toast.success(

                    "Customer deleted."

                );

                loadCustomers();

            }

            catch{

                toast.error(

                    "Delete failed."

                );

            }

            finally{

                setDeleting(null);

            }

        };

    const saveCustomer =

        async()=>{

            try{

                setSaving(true);

                await updateCustomer(

                    editingCustomer.id,

                    editingCustomer

                );

                toast.success(

                    "Customer updated."

                );

                setEditingCustomer(

                    null

                );

                loadCustomers();

            }

            catch{

                toast.error(

                    "Update failed."

                );

            }

            finally{

                setSaving(false);

            }

        };

    const gstRegistered =

        customers.filter(

            c =>

            c.gstin &&

            c.gstin.trim()!==''

        ).length;

    return (

    <MainLayout>

        {/* =============================
                PAGE HEADER
        ============================== */}

        <div className="row mb-4 g-3">

            <div className="col-lg-4">

                <div className="premium-stat-card">

                    <h2>

                        {customers.length}

                    </h2>

                    <small>

                        Total Customers

                    </small>

                </div>

            </div>

            <div className="col-lg-4">

                <div className="premium-stat-card success">

                    <h2>

                        {gstRegistered}

                    </h2>

                    <small>

                        GST Registered

                    </small>

                </div>

            </div>

            <div className="col-lg-4">

                <div className="premium-stat-card warning">

                    <h2>

                        {customers.length-gstRegistered}

                    </h2>

                    <small>

                        Without GST

                    </small>

                </div>

            </div>

        </div>

        {/* =============================
                TABLE CARD
        ============================== */}

        <div className="premium-card">

            <div className="table-header">

                <div>

                    <h3>

                        Customers

                    </h3>

                    <small>

                        Manage all customers.

                    </small>

                </div>

                <div style={{maxWidth:"350px",width:"100%"}}>

                    <input

                        className="form-control premium-input"

                        placeholder="🔍 Search customer..."

                        value={search}

                        onChange={(e)=>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

            {

                loading ?

                <>

                    {

                        [...Array(6)].map((_,i)=>

                            <div

                                key={i}

                                className="placeholder-glow mb-3"

                            >

                                <span className="placeholder col-12 rounded"></span>

                            </div>

                        )

                    }

                </>

                :

                filteredCustomers.length===0 ?

                <div className="text-center py-5">

                    <h4>

                        No Customers Found

                    </h4>

                    <p className="text-muted">

                        Try another search.

                    </p>

                </div>

                :

                <div className="table-responsive">

                    <table className="table premium-item-table align-middle">

                        <thead>

                        <tr>

                            <th>

                                Customer

                            </th>

                            <th>

                                GSTIN

                            </th>

                            <th>

                                Phone

                            </th>

                            <th>

                                Address

                            </th>

                            <th width="170">

                                Actions

                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            filteredCustomers.map(customer=>

                                <tr key={customer.id}>

                                    <td>

                                        <strong>

                                            {customer.name}

                                        </strong>

                                    </td>

                                    <td>

                                        {

                                            customer.gstin ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            customer.phone ||

                                            "-"

                                        }

                                    </td>

                                    <td style={{maxWidth:"350px"}}>

                                        {

                                            customer.address ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        <div className="d-flex gap-2">

                                            <button

                                                className="btn btn-warning btn-sm"

                                                onClick={()=>

                                                    setEditingCustomer(

                                                        {...customer}

                                                    )

                                                }

                                            >

                                                ✏ Edit

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                disabled={

                                                    deleting===customer.id

                                                }

                                                onClick={()=>

                                                    handleDelete(

                                                        customer.id

                                                    )

                                                }

                                            >

                                                {

                                                    deleting===customer.id ?

                                                    <>

                                                        <span className="spinner-border spinner-border-sm"></span>

                                                    </>

                                                    :

                                                    "🗑 Delete"

                                                }

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )

                        }

                        </tbody>

                    </table>

                </div>

            }

                        {/* ===============================
                    EDIT CUSTOMER MODAL
            ================================ */}

            {

                editingCustomer &&

                <div
                    className="premium-modal-backdrop"
                    onClick={()=>

                        setEditingCustomer(null)

                    }
                >

                    <div

                        className="premium-modal"

                        onClick={(e)=>

                            e.stopPropagation()

                        }

                    >

                        <div className="premium-modal-header">

                            <div>

                                <h4>

                                    Edit Customer

                                </h4>

                                <small>

                                    Update customer details.

                                </small>

                            </div>

                            <button

                                className="btn-close"

                                onClick={()=>

                                    setEditingCustomer(null)

                                }

                            />

                        </div>

                        <div className="premium-modal-body">

                            <div className="mb-3">

                                <label>

                                    Customer Name

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={editingCustomer.name}

                                    onChange={(e)=>

                                        setEditingCustomer({

                                            ...editingCustomer,

                                            name:e.target.value

                                        })

                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label>

                                    GSTIN

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={editingCustomer.gstin}

                                    onChange={(e)=>

                                        setEditingCustomer({

                                            ...editingCustomer,

                                            gstin:e.target.value

                                        })

                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label>

                                    Phone

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={editingCustomer.phone}

                                    onChange={(e)=>

                                        setEditingCustomer({

                                            ...editingCustomer,

                                            phone:e.target.value

                                        })

                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label>

                                    Address

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control premium-input"

                                    value={editingCustomer.address}

                                    onChange={(e)=>

                                        setEditingCustomer({

                                            ...editingCustomer,

                                            address:e.target.value

                                        })

                                    }

                                />

                            </div>

                        </div>

                        <div className="premium-modal-footer">

                            <button

                                className="btn btn-light"

                                disabled={saving}

                                onClick={()=>

                                    setEditingCustomer(null)

                                }

                            >

                                Cancel

                            </button>

                            <button

                                className="btn btn-premium"

                                disabled={saving}

                                onClick={saveCustomer}

                            >

                                {

                                    saving ?

                                    <>

                                        <span className="spinner-border spinner-border-sm me-2"></span>

                                        Saving...

                                    </>

                                    :

                                    "Save Changes"

                                }

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    </MainLayout>

);

}

export default Customers;