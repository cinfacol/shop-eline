import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout;
