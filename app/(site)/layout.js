import { ToastContainer } from "react-toastify";
import FixedcartToolbar from "../componnent/FixedCartToolbar";
import Footer from "../componnent/Footer";



const siteLayout = ({ children }) => {



    return (
        <div>
            <FixedcartToolbar />
            {children}
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default siteLayout;