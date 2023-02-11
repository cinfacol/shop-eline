import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";

const reducer = {
	properties: propertyReducer,
		auth: authReducer,
}

export const store = configureStore({
	reducer,
	devTools:true,
});
