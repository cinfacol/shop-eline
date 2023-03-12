import { createSlice } from '@reduxjs/toolkit';
import { getProfile }  from './profileService';

const initialState = {
  profile: null,
  status: 'idle'
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
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
