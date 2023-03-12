import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";

const Layout = ({children}) => {

  return (
    <>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout;
