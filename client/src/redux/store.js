import { configureStore } from "@reduxjs/toolkit";

import adsSlice from "./ads";
import authSlice from "./auth";

const store = configureStore({
  reducer: { ads: adsSlice.reducer, auth: authSlice.reducer },
});

export default store;
