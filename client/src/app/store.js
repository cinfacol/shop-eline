import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";
import profileReducer from "../features/profiles/profileSlice"

const reducer = {
	properties: propertyReducer,
	auth: authReducer,
	profile: profileReducer,
}

export const store = configureStore({
	reducer,
	devTools:true,
});
