import { configureStore } from "@reduxjs/toolkit";

import adsSlice from "./ads";
import authSlice from "./auth";
import usersSlice from "./users";

const store = configureStore({
  reducer: {
    ads: adsSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
