import {
    Doughnut
}
from "react-chartjs-2";

import {

    Chart as ChartJS,

    ArcElement,

    Tooltip,

    Legend

}
from "chart.js";

ChartJS.register(

    ArcElement,

    Tooltip,

    Legend

);

function GSTChart({

    gst

}){

    const data={

        labels:[

            "CGST",

            "SGST",

            "IGST"

        ],

        datasets:[

            {

                data:[

                    gst.cgst||0,

                    gst.sgst||0,

                    gst.igst||0

                ],

                backgroundColor:[

                    "#2563eb",

                    "#16a34a",

                    "#f59e0b"

                ]

            }

        ]

    };

    return(

        <div className="premium-card">

            <h4>

                GST Distribution

            </h4>

            <Doughnut

                data={data}

            />

        </div>

    );

}

export default GSTChart;