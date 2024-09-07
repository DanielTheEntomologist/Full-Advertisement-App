import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/";
const COLLECTION_NAME = "auth";

// Define an async thunk action for fetching ads
export const login = createAsyncThunk(
  "auth/login",
  async ({ login, password }) => {
    const urlencodedData = new URLSearchParams({ login, password }); // Encode the data as x-www-form-urlencoded

    const response = await fetch(API_URL + COLLECTION_NAME + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencodedData.toString(),
    });

    const data = await response.json();
    console.log("login response data", data);
    return data;
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await fetch(API_URL + COLLECTION_NAME + "/logout", {
    method: "DELETE",
  });

  const data = await response.json();
  console.log("logout response data", data);
  return data;
});

const unauthorizedUserState = {
  id: null,
  login: null,
  password: null,
  userData: null,
  status: "unauthorized",
  error: null,
};

const setAsLoggedInReducer = (state, action) => {
  console.log("setAsLoggedInReducer", action.payload);
  const user = action.payload;
  const { id } = user;
  state.id = id;
  state.userData = user;
  state.status = "authorized";
  return state;
};
const setAsLoggedOutReducer = (state) => {
  // state = ;
  return unauthorizedUserState;
};

const authSlice = createSlice({
  name: "user",
  initialState: unauthorizedUserState,

  reducers: {
    setAsLoggedIn: setAsLoggedInReducer,
    setAsLoggedOut: setAsLoggedOutReducer,
  },
  selectors: {
    currentUser: (state) => state,
  },
  extraReducers: (builder) => {
    // login cases
    builder.addCase(login.pending, (state) => {
      state.status = "authorizing";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "authorized";
      console.log("login.fulfilled", action.payload);

      state = setAsLoggedInReducer(state, action);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed authorization";
      console.log("login.rejected", action.error.message);
      state.error = action.error.message;
    });
    // logout cases
    builder.addCase(logout.pending, (state) => {
      state.status = "logging out";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log("loggout.fullfilled", action.payload);
      state = setAsLoggedOutReducer(state);
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed logout";
      state.error = action.error.message;
    });
  },
});

export default authSlice;
// export const { addMultiple, login } = authSlice.actions;
export const { currentUser } = authSlice.selectors;
