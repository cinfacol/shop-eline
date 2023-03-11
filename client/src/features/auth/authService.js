import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REGISTER_URL = "/api/v1/auth/users/";
const GET_USER_URL = "/api/v1/auth/users/me/";
const LOGIN_URL = "/api/v1/auth/jwt/create/";
const ACTIVATE_URL = "/api/v1/auth/users/activation/";
const RESET_PASS_URL = "/api/v1/auth/users/reset_password/";
const RESET_PASS_CONFIRM_URL = "/api/v1/auth/users/reset_password_confirm/";

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async ({ username, first_name, last_name, email, password, re_password }, thunkAPI) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			}
		};
		const body = JSON.stringify({
			username,
			first_name,
			last_name,
			email,
			password,
			re_password,
		});

		try {
			const response = await axios.post(REGISTER_URL, body, config );

			if (response.status === 201) {
				return response.data;
			} else {
				return thunkAPI.rejectWithValue(Error);
			}
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// load User
export const getUser = createAsyncThunk(
	"auth/getUser",
	async (_, thunkAPI) => {
		if (localStorage.getItem('access')) {
			const config = {
				headers: {
					'Authorization': `JWT ${localStorage.getItem('access')}`,
					'Content-Type': 'application/json',
				}
			};

			try {
				const response = await axios.get(GET_USER_URL, config );

				if (response.status === 200) {
					localStorage.setItem('user', JSON.stringify(response.data));
					return response.data;
				} else {
					return thunkAPI.rejectWithValue(Error);
				}
			} catch (error) {
				const message =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				return thunkAPI.rejectWithValue(message);
			}
		}
	}
);

// Login user
export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password  }, thunkAPI) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			}
		};
		const body = JSON.stringify({
			email,
			password,
		});

		try {
			const response = await axios.post(LOGIN_URL, body, config );

			if (response.status === 200) {
				localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
				const { dispatch } = thunkAPI;

				dispatch(getUser());
				return response.data;
			} else {
				return thunkAPI.rejectWithValue(Error);
			}
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

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

const authService = { register, login, activate, reset_password, reset_password_confirm  };

export default authService;
