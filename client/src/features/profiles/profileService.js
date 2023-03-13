import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROFILE_API_URL = "api/profile/me/"
const UPDATE_PROFILE_API_URL = "api/profile/update"

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
  async ({ phone_number, about_me, address_line_1, address_line_2, profile_photo, gender, country, city, zipcode }, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      };

      const body = JSON.stringify({
        phone_number,
        about_me,
        address_line_1,
        address_line_2,
        profile_photo,
        gender,
        country,
        city,
        zipcode,
      });

      try {
        console.log('body', body);
        const response = await axios.patch(UPDATE_PROFILE_API_URL, body, config);
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
