function ItemTable({

    items,
    setItems

}) {

    const updateItem =
        (
            index,
            field,
            value
        ) => {

            const updated =
                [...items];

            updated[index][field]
                =
                value;

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

    const removeRow =
        (index) => {

            if(items.length===1)
                return;

            const updated =
                [...items];

            updated.splice(
                index,
                1
            );

            setItems(
                updated
            );

        };

    return (

        <div className="premium-card">

            <div className="d-flex justify-content-between mb-3">

                <h5>

                    Invoice Items

                </h5>

                <button
                    className="btn btn-premium"
                    onClick={addRow}
                >
                    + Add Item
                </button>

            </div>

            <div className="table-responsive">

                <table className="table premium-table">

                    <thead>

                    <tr>

                        <th>Description</th>
                        <th>HSN/SAC</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th></th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        items.map(

                            (item,index)=>

                                <tr key={index}>

                                    <td>

                                        <input
                                            className="form-control"
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
                                            className="form-control"
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
                                            className="form-control"
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
                                            className="form-control"
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

                                        ₹ {

                                            (
                                                Number(item.qty)
                                                *
                                                Number(item.rate)
                                            ).toFixed(2)

                                        }

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-danger"
                                            onClick={()=>

                                                removeRow(
                                                    index
                                                )

                                            }
                                        >
                                            Remove
                                        </button>

                                    </td>

                                </tr>

                        )

                    }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ItemTable;