import Navbar
from "../components/Navbar";

function MainLayout({

    children

}) {

    return (

        <>

            <Navbar />

            <div
                className=
                "main-container"
            >

                {children}

            </div>

        </>

    );

}

export default MainLayout;