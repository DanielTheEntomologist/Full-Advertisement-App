import { configureStore } from "@reduxjs/toolkit";

import adsSlice from "./ads";

const store = configureStore({
  reducer: adsSlice.reducer,
});

export default store;
