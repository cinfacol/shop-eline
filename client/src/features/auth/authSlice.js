import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

console.log('user', user);

const initialState = {
	user: user ? user : null,
	isError: false,
	isLoggedIn: false,
	isLoading: false,
	isSuccess: false,
	isPassReset: false,
	isPassResetSend: false,
	message: "",
};

export const register = createAsyncThunk(
	"auth/register",
	async ({ username, first_name, last_name, email, password, re_password }, thunkAPI) => {
		try {
			return await authService.register({ username, first_name, last_name, email, password, re_password });
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

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
	try {
		return await authService.login({ email, password });
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	authService.logout();
});

export const activate = createAsyncThunk(
	"auth/activate",
	async (user, thunkAPI) => {
		try {
			return await authService.activate(user);
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
	async(email, thunkAPI) => {
		try {
			return await authService.reset_password(email);
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
		try {
			return await authService.reset_password_confirm({ uid, token, new_password, re_new_password });
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

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.isPassReset = false;
			state.isPassResetSend = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isLoggedIn = false;
				state.isSuccess = false;
				state.isPassResetSend = false;
			})
			.addCase(activate.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activate.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(activate.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(reset_password.pending, (state) => {
        state.isLoading = true;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
      .addCase(reset_password.fulfilled, (state) => {
        state.isLoading = false;
				state.isSuccess = true;
				state.isPassResetSend = true;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.isLoading = false;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
			.addCase(reset_password_confirm.pending, (state) => {
        state.isLoading = true;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
      .addCase(reset_password_confirm.fulfilled, (state) => {
        state.isLoading = false;
				state.isSuccess = true;
				state.isPassResetSend = true;
      })
      .addCase(reset_password_confirm.rejected, (state, action) => {
        state.isLoading = false;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
