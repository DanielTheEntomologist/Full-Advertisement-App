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

export const fetchAdById = createAsyncThunk("ads/fetchAdById", async (id) => {
  const response = await fetch(API_URL + COLLECTION_NAME + "/" + id, {
    method: "GET",
  });

  const data = await response.json();
  data.id = data._id;
  delete data._id;
  return data;
});

const addMultipleReducer = (state, action) => {
  const incomingAds = action.payload;
  const incomingIds = incomingAds.map((ad) => ad.id);
  if (state.ads) {
    state.ads = state.ads.filter((ad) => !incomingIds.includes(ad.id));
  }
  state.ads.push(...incomingAds);
  return state;
};

const addSingleReducer = (state, action) => {
  const incomingItem = action.payload;
  const incomingId = incomingItem.id;
  state[COLLECTION_NAME] = state[COLLECTION_NAME].filter(
    (item) => incomingId === item.id
  );
  state[COLLECTION_NAME].push(incomingItem);
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
    addSingle: addSingleReducer,
    addMultiple: addMultipleReducer,
  },
  selectors: {
    sellectAllAds: (state) => state.ads,
    selectAdById: (state, id) => state.ads.find((ad) => ad.id === id),
    selectFirst: (state) => state.ads[0] || null,
  },
  extraReducers: (builder) => {
    // fetchAds cases
    builder.addCase(fetchAds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.status = "succeeded";
      state = addMultipleReducer(state, action);
    });
    builder.addCase(fetchAds.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // fetchAdbyId cases
    builder.addCase(fetchAdById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAdById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state = addSingleReducer(state, action);
    });
    builder.addCase(fetchAdById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default adsSlice;
export const { addMultiple, addSingle } = adsSlice.actions;
export const { sellectAllAds, selectAdById, selectFirst } = adsSlice.selectors;
