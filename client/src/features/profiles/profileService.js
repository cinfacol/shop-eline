import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROFILE_API_URL = "api/profile/me/"
// const UPDATE_PROFILE_API_URL = "api/profile/update/"

export const getProfile = createAsyncThunk(
  "profile/get_profile",
  async(_, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };

      try {
        const response = await axios.get(PROFILE_API_URL, config);
        if (response.status === 200) {
          localStorage.setItem('profile', JSON.stringify(response.data));
          return response.data;
        } else {
          return thunkAPI.dispatch(Error);
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
)

export const update_profile = createAsyncThunk(
  'profile/update_profile',
  async ( {username, formData} , thunkAPI) => {
    console.log('async_formData', formData);
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      };

      try {
        const response = await axios.patch(`api/profile/update/${username}/`, formData, config);
        console.log('response', response);
        if (response.status === 200 && !response.data.error) {
          return response.data;
        } else {
          return thunkAPI.dispatch(Error);
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
