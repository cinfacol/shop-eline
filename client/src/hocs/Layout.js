import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";
// import {get_profile} from "../features/profiles/profileService";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

const Layout = ({children}) => {
  // const dispatch = useDispatch()

  /* useEffect(() => {
    dispatch(get_profile());
  }, [dispatch]); */
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
