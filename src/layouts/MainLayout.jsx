import Navbar from "../components/Navbar";
import "../styles/global.css";

function MainLayout({ children }) {

    return (

        <>
            <Navbar />

            <main className="main-layout">

                <div className="main-wrapper">

                    {children}

                </div>

            </main>

            <footer className="footer">

                © {new Date().getFullYear()} RK Plastic Invoice Management System

            </footer>

        </>

    );

}

export default MainLayout;