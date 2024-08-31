import { createSlice } from "@reduxjs/toolkit";

const adsSlice = createSlice({
  name: "ads",
  initialState: [],
  reducers: {
    addSingle: (state, action) => {
      const ad = action.payload;
      const incomingId = ad.id;
      state = state.filter((ad) => incomingId === ad.id);
      state.push(ad);
      return state;
    },
    addMultiple: (state, action) => {
      console.log("Adding multiple ads");
      console.log(action);
      const ads = action.payload;
      const incomingIds = ads.map((ad) => ad.id);
      state = state.filter((ad) => !incomingIds.includes(ad.id));
      state.push(...ads);
      return state;
    },
  },
});

export default adsSlice;
export const { addMultiple, addSingle } = adsSlice.actions;
