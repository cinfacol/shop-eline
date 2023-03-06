import axios from "axios";

const REGISTER_URL = "/api/v1/auth/users/";
const LOGIN_URL = "/api/v1/auth/jwt/create/";
const ACTIVATE_URL = "/api/v1/auth/users/activation/";
const RESET_PASS_URL = "/api/v1/auth/users/reset_password/";
const RESET_PASS_CONFIRM_URL = "/api/v1/auth/users/reset_password_confirm/";

// Register user
const register = async (username, first_name, last_name, email, password, re_password) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axios.post(REGISTER_URL, username, first_name, last_name, email, password, re_password, config);
	return response.data;
};

// Login user

const login = async ({ email, password }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await axios.post(LOGIN_URL, { email, password }, config);
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const logout = () => localStorage.removeItem("user");

const activate = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await axios.post(ACTIVATE_URL, userData, config);
	return response.data;
};

export const reset_password = async ({ email }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(RESET_PASS_URL, { email }, config);
		return response.data;
  };

export const reset_password_confirm =
  async ({ uid, token, new_password, re_new_password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
		const response = await axios.post(RESET_PASS_CONFIRM_URL, { uid, token, new_password, re_new_password, }, config);
		return response.data
  }

const authService = { register, login, logout, activate, reset_password, reset_password_confirm  };

export default authService;
