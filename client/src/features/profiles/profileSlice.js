import { createSlice } from '@reduxjs/toolkit';
import { getProfile, update_profile }  from './profileService';

const initialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  status: 'idle',
  message: "",
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
      state.status = 'idle';
			state.message = "";
		},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profile = action.payload.profile;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'idle';
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(update_profile.pending, (state) => {
        state.status = 'pending';
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(update_profile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(update_profile.rejected, (state, action) => {
        state.status = 'idle';
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
})

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
