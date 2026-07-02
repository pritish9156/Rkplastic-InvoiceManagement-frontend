import "../styles/global.css";

function ItemTable({

    items,
    setItems

}) {

    const updateItem = (

        index,
        field,
        value

    ) => {

        const updated = [...items];

        updated[index][field] = value;

        setItems(updated);

    };

    const addRow = () => {

        setItems([

            ...items,

            {

                description: "",

                hsnSac: "",

                qty: 1,

                rate: 0

            }

        ]);

    };

    const removeRow = (index) => {

        if (items.length === 1)
            return;

        const updated = [...items];

        updated.splice(index, 1);

        setItems(updated);

    };

    const calculateAmount = (item) =>

        (

            Number(item.qty || 0) *

            Number(item.rate || 0)

        ).toFixed(2);

    return (

    <div className="premium-card">

        <div className="table-header">

            <div>

                <h4>

                    Invoice Items

                </h4>

                <small>

                    Add products or services for this invoice

                </small>

            </div>

            <button

                className="btn btn-premium"

                onClick={addRow}

            >

                + Add Item

            </button>

        </div>

        {/* ============================
                DESKTOP TABLE
        ============================= */}

        <div className="desktop-items">

            <div className="table-responsive">

                <table className="table premium-item-table align-middle">

                    <thead>

                        <tr>

                            <th>Description</th>

                            <th>HSN / SAC</th>

                            <th width="100">

                                Qty

                            </th>

                            <th width="130">

                                Rate

                            </th>

                            <th width="150">

                                Amount

                            </th>

                            <th width="80">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            items.map((item,index)=>{

                                const amount =
                                    calculateAmount(item);

                                return(

                                    <tr key={index}>

                                        <td>

                                            <input

                                                className="form-control premium-input"

                                                placeholder="Description"

                                                value={item.description}

                                                onChange={(e)=>

                                                    updateItem(

                                                        index,

                                                        "description",

                                                        e.target.value

                                                    )

                                                }

                                            />

                                        </td>

                                        <td>

                                            <input

                                                className="form-control premium-input"

                                                placeholder="HSN / SAC"

                                                value={item.hsnSac}

                                                onChange={(e)=>

                                                    updateItem(

                                                        index,

                                                        "hsnSac",

                                                        e.target.value

                                                    )

                                                }

                                            />

                                        </td>

                                        <td>

                                            <input

                                                type="number"

                                                className="form-control premium-input"

                                                value={item.qty}

                                                onChange={(e)=>

                                                    updateItem(

                                                        index,

                                                        "qty",

                                                        e.target.value

                                                    )

                                                }

                                            />

                                        </td>

                                        <td>

                                            <input

                                                type="number"

                                                className="form-control premium-input"

                                                value={item.rate}

                                                onChange={(e)=>

                                                    updateItem(

                                                        index,

                                                        "rate",

                                                        e.target.value

                                                    )

                                                }

                                            />

                                        </td>

                                        <td>

                                            <div className="amount-box">

                                                ₹ {amount}

                                            </div>

                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-outline-danger btn-sm"

                                                disabled={items.length===1}

                                                onClick={()=>removeRow(index)}

                                            >

                                                ✕

                                            </button>

                                        </td>

                                    </tr>

                                );

                            })

                        }

                    </tbody>

                </table>

            </div>

        </div>

        {/* ============================
                MOBILE VIEW
        ============================= */}

        <div className="mobile-items">

            {

    items.map((item,index)=>{

        const amount =
            calculateAmount(item);

        return(

            <div

                key={index}

                className="item-mobile-card"

            >

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h5 className="mb-0">

                        Item {index + 1}

                    </h5>

                    {

                        items.length > 1 &&

                        <button

                            className="btn btn-outline-danger btn-sm"

                            onClick={()=>

                                removeRow(index)

                            }

                        >

                            Remove

                        </button>

                    }

                </div>

                <div className="mb-3">

                    <label className="form-label">

                        Description

                    </label>

                    <input

                        className="form-control premium-input"

                        placeholder="Product Description"

                        value={item.description}

                        onChange={(e)=>

                            updateItem(

                                index,

                                "description",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">

                        HSN / SAC

                    </label>

                    <input

                        className="form-control premium-input"

                        placeholder="HSN / SAC"

                        value={item.hsnSac}

                        onChange={(e)=>

                            updateItem(

                                index,

                                "hsnSac",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="row">

                    <div className="col-6 mb-3">

                        <label className="form-label">

                            Quantity

                        </label>

                        <input

                            type="number"

                            min="1"

                            className="form-control premium-input"

                            value={item.qty}

                            onChange={(e)=>

                                updateItem(

                                    index,

                                    "qty",

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <div className="col-6 mb-3">

                        <label className="form-label">

                            Rate

                        </label>

                        <input

                            type="number"

                            min="0"

                            className="form-control premium-input"

                            value={item.rate}

                            onChange={(e)=>

                                updateItem(

                                    index,

                                    "rate",

                                    e.target.value

                                )

                            }

                        />

                    </div>

                </div>

                <div className="amount-box mt-2">

                    <strong>

                        Amount

                    </strong>

                    <span>

                        ₹ {amount}

                    </span>

                </div>

            </div>

        );

    })

}

        </div>

    </div>

);

}

export default ItemTable;