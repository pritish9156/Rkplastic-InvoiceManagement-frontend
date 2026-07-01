import "../styles/global.css";

function InvoiceSummary({

    subtotal,
    cgst,
    sgst,
    igst,
    grandTotal

}) {

    const summary = [

        {
            label: "Subtotal",
            value: subtotal,
            className: ""
        },

        {
            label: "CGST (9%)",
            value: cgst,
            className: "text-success"
        },

        {
            label: "SGST (9%)",
            value: sgst,
            className: "text-success"
        },

        {
            label: "IGST (18%)",
            value: igst,
            className: "text-warning"
        }

    ];

    return (

        <div className="premium-card invoice-summary-card">

            <div className="summary-header">

                <h4>

                    Invoice Summary

                </h4>

                <small>

                    Tax Calculation

                </small>

            </div>

            {

                summary.map((item, index) => (

                    <div
                        className="summary-row"
                        key={index}
                    >

                        <span>

                            {item.label}

                        </span>

                        <strong className={item.className}>

                            ₹ {item.value.toFixed(2)}

                        </strong>

                    </div>

                ))

            }

            <hr className="summary-divider" />

            <div className="summary-total">

                <div>

                    <small>

                        Total Payable

                    </small>

                    <h4>

                        ₹ {grandTotal.toFixed(2)}

                    </h4>

                </div>

                <div className="total-badge">

                    GST

                </div>

            </div>

        </div>

    );

}

export default InvoiceSummary;