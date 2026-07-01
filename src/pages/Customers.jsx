import {
    useEffect,
    useState
}
    from "react";

import MainLayout
    from "../layouts/MainLayout";

import toast
    from "react-hot-toast";

import {

    getAllCustomers,
    updateCustomer,
    deleteCustomer

}
    from "../api/customerApi";

function Customers() {

    const [
        customers,
        setCustomers
    ] = useState([]);

    const [
        search,
        setSearch
    ] = useState("");

    useEffect(() => {

        loadCustomers();

    }, []);

    const [editingCustomer,
        setEditingCustomer]
        =
        useState(null);

    const loadCustomers =
        async () => {

            const response =
                await getAllCustomers();

            setCustomers(
                response.data
            );

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
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete Customer ?"
                );

            if (!confirmDelete)
                return;

            try {

                await deleteCustomer(id);

                toast.success(
                    "Customer Deleted"
                );

                loadCustomers();

            }
            catch {

                toast.error(
                    "Delete Failed"
                );

            }

        };

    const saveCustomer =
        async () => {

            try {

                await updateCustomer(

                    editingCustomer.id,

                    editingCustomer

                );

                toast.success(
                    "Customer Updated"
                );

                setEditingCustomer(
                    null
                );

                loadCustomers();

            }
            catch {

                toast.error(
                    "Update Failed"
                );

            }

        };

    return (

        <MainLayout>

            <div className="premium-card">

                <div className="d-flex justify-content-between mb-4">

                    <h3>

                        Customers

                    </h3>

                    <span
                        className="badge bg-primary"
                    >

                        {customers.length}

                    </span>

                </div>

                <input

                    className="form-control mb-4"

                    placeholder="Search Customer"

                    value={search}

                    onChange={(e) =>

                        setSearch(
                            e.target.value
                        )

                    }

                />

                <table
                    className=
                    "table premium-table"
                >

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>GSTIN</th>

                            <th>Phone</th>

                            <th>Address</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredCustomers.map(

                                customer =>

                                    <tr
                                        key={
                                            customer.id
                                        }
                                    >

                                        <td>

                                            <strong>

                                                {
                                                    customer.name
                                                }

                                            </strong>

                                        </td>

                                        <td>

                                            {
                                                customer.gstin
                                            }

                                        </td>

                                        <td>

                                            {
                                                customer.phone
                                            }

                                        </td>

                                        <td>

                                            {
                                                customer.address
                                            }

                                        </td>

                                        <td>

                                            <div
                                                className="d-flex gap-2"
                                            >

                                                <button

                                                    className=
                                                    "btn btn-warning btn-sm"

                                                    onClick={() =>

                                                        setEditingCustomer(
                                                            customer
                                                        )

                                                    }

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    className=
                                                    "btn btn-danger btn-sm"

                                                    onClick={() =>

                                                        handleDelete(
                                                            customer.id
                                                        )

                                                    }

                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                            )

                        }

                    </tbody>

                </table>

                {
                    editingCustomer &&

                    <div
                        className="modal d-block"
                        style={{
                            background:
                                "rgba(0,0,0,.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5>

                                        Edit Customer

                                    </h5>

                                    <button

                                        className="btn-close"

                                        onClick={() =>

                                            setEditingCustomer(
                                                null
                                            )

                                        }

                                    />

                                </div>

                                <div className="modal-body">

                                    <input

                                        className="form-control mb-2"

                                        value={
                                            editingCustomer.name
                                        }

                                        onChange={(e) =>

                                            setEditingCustomer({

                                                ...editingCustomer,

                                                name: e.target.value

                                            })

                                        }

                                    />

                                    <input

                                        className="form-control mb-2"

                                        value={
                                            editingCustomer.gstin
                                        }

                                        onChange={(e) =>

                                            setEditingCustomer({

                                                ...editingCustomer,

                                                gstin: e.target.value

                                            })

                                        }

                                    />

                                    <input

                                        className="form-control mb-2"

                                        value={
                                            editingCustomer.phone
                                        }

                                        onChange={(e) =>

                                            setEditingCustomer({

                                                ...editingCustomer,

                                                phone: e.target.value

                                            })

                                        }

                                    />

                                    <textarea

                                        className="form-control"

                                        value={
                                            editingCustomer.address
                                        }

                                        onChange={(e) =>

                                            setEditingCustomer({

                                                ...editingCustomer,

                                                address: e.target.value

                                            })

                                        }

                                    />

                                </div>

                                <div className="modal-footer">

                                    <button

                                        className=
                                        "btn btn-secondary"

                                        onClick={() =>

                                            setEditingCustomer(
                                                null
                                            )

                                        }

                                    >

                                        Cancel

                                    </button>

                                    <button

                                        className=
                                        "btn btn-success"

                                        onClick={
                                            saveCustomer
                                        }

                                    >

                                        Save

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                }

            </div>

        </MainLayout>

    );

}

export default Customers;