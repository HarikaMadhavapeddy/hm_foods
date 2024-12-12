import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default AuthSlice.reducer;
export const {setUser} =AuthSlice.actions;
