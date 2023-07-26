import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REGISTER_URL = "/api/auth/users/";
const GET_USER_URL = "/api/auth/users/me/";
const LOGIN_URL = "/api/auth/jwt/create/";
const ACTIVATE_URL = "/api/auth/users/activation/";
const RESET_PASS_URL = "/api/auth/users/reset_password/";
const RESET_PASS_CONFIRM_URL = "/api/auth/users/reset_password_confirm/";

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
				console.log('axios_error', response);
				return thunkAPI.rejectWithValue(Error);
			}
		} catch (error) {
			const message =
				(error.response &&
					error.response.data.detail) ||
					error.message ||
					error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const activate = createAsyncThunk(
	"auth/activate",
	async (userData, thunkAPI) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			}
		};
		try {
			const response = await axios.post(ACTIVATE_URL, userData, config);
			if (response.status === 204) {
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

export const reset_password = createAsyncThunk(
	"auth/reset_password",
	async({ email }, thunkAPI) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post(RESET_PASS_URL, { email }, config);
			if (response.status === 204) {
				return response.data
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
)

export const reset_password_confirm = createAsyncThunk(
	"auth/reset_password_confirm",
	async({ uid, token, new_password, re_new_password }, thunkAPI) => {
		const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
		try {
			const response = await axios.post(RESET_PASS_CONFIRM_URL, { uid, token, new_password, re_new_password, }, config);
			if (response.status === 204) {
				return response.data
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
)
