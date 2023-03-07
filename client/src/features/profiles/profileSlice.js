import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService  from './profileService';

const initialState = {
  profile: null
}

export const get_profile = createAsyncThunk(
  "profile/get_profile",
  async({ email, password }, thunkAPI) => {
    try {
			return await profileService.register({  email, password });
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

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_profile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(get_profile.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.profile = action.payload.profile;
        }
      })
      .addCase(get_profile.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
      })
      /* .addCase(update_profile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(update_profile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profile = action.payload;
      })
      .addCase(update_profile.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
      }) */
  }
})

export default profileSlice.reducer;
