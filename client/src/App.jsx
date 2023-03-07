import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ActivatePage from "./pages/ActivatePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import PropertiesPage from "./pages/PropertiesPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage"

function App () {
	return (
		<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/properties"
						element={<PropertiesPage />}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/reset_password" element={<ResetPassword />} />
					<Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
					<Route
						path="/activate/:uid/:token"
						element={<ActivatePage />}
					/>
					<Route path="/properties" element={<PropertiesPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<ToastContainer theme="dark" />
			<Footer />
		</Router>
	);
};

export default App;
