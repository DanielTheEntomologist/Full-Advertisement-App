import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/";
const COLLECTION_NAME = "users";

// Define an async thunk action for fetching ads
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    const response = await fetch(API_URL + COLLECTION_NAME + "/" + userId, {
      method: "GET",
    });

    const data = await response.json();

    // todo: harmonize ids with backend
    // for (let item of data) {
    //   item.id = item._id;
    //   delete item._id;
    // }
    data.id = data._id;
    delete data._id;
    return data;
  }
);

const addMultipleReducer = (state, action) => {
  const incomingItems = action.payload;
  const incomingIds = incomingItems.map((ad) => ad.id);
  if (state[COLLECTION_NAME]) {
    state[COLLECTION_NAME] = state[COLLECTION_NAME].filter(
      (item) => !incomingIds.includes(item.id)
    );
  }
  state[COLLECTION_NAME].push(...incomingItems);
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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addSingle: addSingleReducer,
    addMultiple: addMultipleReducer,
  },
  selectors: {
    sellectAll: (state) => state[COLLECTION_NAME],
    selectById: (state, id) =>
      state[COLLECTION_NAME].find((item) => item.id === id),
    selectFirst: (state) => state[COLLECTION_NAME][0] || null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state = addSingleReducer(state, action);
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const usersRedux = {
  actions: usersSlice.actions,
  fetch: fetchUserById,
  selectors: usersSlice.selectors,
};

export default usersSlice;
export const { addMultiple, addSingle } = usersSlice.actions;
export const { sellectAll, selectById, selectFirst } = usersSlice.selectors;
