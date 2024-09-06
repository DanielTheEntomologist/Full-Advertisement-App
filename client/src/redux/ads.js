import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/";
const COLLECTION_NAME = "ads";

// Define an async thunk action for fetching ads
export const fetchAds = createAsyncThunk("ads/fetchAds", async () => {
  const response = await fetch(API_URL + COLLECTION_NAME, { method: "GET" });

  const data = await response.json();
  for (let ad of data) {
    ad.id = ad._id;
    ad.description = ad.content;
    delete ad._id, ad.content;
  }
  return data;
});

const addMultipleReducer = (state, action) => {
  console.log("addMultipleReducer state", state.ads);
  console.log("addMultipleReducer action", action);
  const incomingAds = action.payload;
  const incomingIds = incomingAds.map((ad) => ad.id);
  if (state.ads) {
    state.ads = state.ads.filter((ad) => !incomingIds.includes(ad.id));
  }
  state.ads.push(...incomingAds);
  console.log("addMultipleReducer state after", state.ads);
  return state;
};

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    status: "idle",
    error: null,
    currentPage: 1,
    hasMore: true,
  },
  reducers: {
    addSingle: (state, action) => {
      const incomingAd = action.payload;
      const incomingId = incomingAd.id;
      state.ads = state.ads.filter((ad) => incomingId === ad.id);
      state.ads.push(ad);
      return state;
    },
    addMultiple: addMultipleReducer,
  },
  selectors: {
    sellectAllAds: (state) => state.ads,
    selectAdById: (state, id) => state.ads.find((ad) => ad.id === id),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log("fetchAds.fulfilled", action.payload);
      // state.ads.push(...action.payload);
      state = addMultipleReducer(state, action);
    });
    builder.addCase(fetchAds.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default adsSlice;
export const { addMultiple, addSingle } = adsSlice.actions;
export const { sellectAllAds, selectAdById } = adsSlice.selectors;
