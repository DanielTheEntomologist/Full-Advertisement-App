import { configureStore } from "@reduxjs/toolkit";

import adsSlice from "./ads";

const store = configureStore({
  reducer: { ads: adsSlice.reducer },
});

export default store;
