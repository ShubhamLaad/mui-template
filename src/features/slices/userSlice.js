import { createSlice } from "@reduxjs/toolkit";
import SessionProvider from "../../utils/SessionProvider";

const initialState = {
  sessionObj: SessionProvider.getSession() || {},
};

export const userSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      SessionProvider.createSession(action.payload);
      state.sessionObj = action.payload;
    },
    userLogOut: (state) => {
      SessionProvider.deleteSession();
      state.sessionObj = {};
    },
  },
});

export const { userLogin } = userSlice.actions;
