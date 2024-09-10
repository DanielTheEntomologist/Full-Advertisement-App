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

export const fetchCurrentUser = createAsyncThunk("auth/user", async ({}) => {
  const response = await fetch(API_URL + COLLECTION_NAME + "/user", {
    method: "GET",
  });

  const data = await response.json();
  return data;
});

const unauthorizedUserState = {
  id: null,
  login: null,
  password: null,
  userData: null,
  status: "unauthorized",
  pendingAction: null,
  error: null,
};

const setAsLoggedInReducer = (state, action) => {
  console.log("setAsLoggedInReducer", action.payload);
  const user = action.payload.user;
  user.id = user._id;
  state.id = user.id;
  state.loginName = user.login;
  state.userData = user;
  state.status = "authorized";
  state.pendingAction = null;
  return state;
};
const setAsLoggedOutReducer = (state) => {
  // use object.assign to preserve the reference to the state draft object
  // otherwise the state changes will be lost
  return Object.assign(state, unauthorizedUserState);
};

const authSlice = createSlice({
  name: "auth",
  initialState: unauthorizedUserState,

  reducers: {
    setAsLoggedIn: setAsLoggedInReducer,
    setAsLoggedOut: setAsLoggedOutReducer,
  },
  selectors: {
    currentUser: (state) => state,
    loginName: (state) => state.loginName,
    loginStatus: (state) => state.status,
    pendingAction: (state) => state.pendingAction,
  },

  extraReducers: (builder) => {
    // login cases
    builder.addCase(login.pending, (state) => {
      state.pendingAction = "login";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login.fulfilled", action.payload);
      state.pendingAction = null;
      setAsLoggedInReducer(state, action);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.pendingAction = null;
      console.log("login.rejected", action.error.message);
      state.error = action.error.message;
    });
    // logout cases
    builder.addCase(logout.pending, (state) => {
      state.pendingAction = "logout";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log("logout.fullfilled", action.payload);
      state.pendingAction = null;
      setAsLoggedOutReducer(state);
      console.log("state after logout fullfilled", state);
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.pendingAction = null;
      state.error = action.error.message;
    });
  },
});

export default authSlice;
// export const { addMultiple, login } = authSlice.actions;
export const { currentUser, loginName, loginStatus, pendingAction } =
  authSlice.selectors;
