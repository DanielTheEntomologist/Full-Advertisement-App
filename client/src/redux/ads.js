import { createSlice } from "@reduxjs/toolkit";

const adsSlice = createSlice({
  name: "ads",
  initialState: [],
  reducers: {
    addSingle: (state, action) => {
      const incomingAd = action.payload;
      const incomingId = incomingAd.id;
      state = state.filter((ad) => incomingId === ad.id);
      state.push(ad);
      return state;
    },
    addMultiple: (state, action) => {
      const incomingAds = action.payload;
      const incomingIds = incomingAds.map((ad) => ad.id);
      if (state) {
        state = state.filter((ad) => !incomingIds.includes(ad.id));
      }
      state.push(...incomingAds);

      return state;
    },
  },
  selectors: {
    sellectAllAds: (state) => state,
    selectAdById: (state, id) => state.find((ad) => ad.id === id),
  },
});

export default adsSlice;
export const { addMultiple, addSingle } = adsSlice.actions;
export const { sellectAllAds, selectAdById } = adsSlice.selectors;
