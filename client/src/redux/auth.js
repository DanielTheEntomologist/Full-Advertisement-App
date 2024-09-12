import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/";
const COLLECTION_NAME = "auth";

// Define an async thunk action for fetching ads
export const loginUser = createAsyncThunk(
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

    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await fetch(API_URL + COLLECTION_NAME + "/logout", {
    method: "DELETE",
  });

  const data = await response.json();

  return data;
});

export const fetchCurrentUser = createAsyncThunk("auth/user", async ({}) => {
  const response = await fetch(API_URL + COLLECTION_NAME + "/user", {
    method: "GET",
  });

  const data = await response.json();
  return data;
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ login, password, avatar, phone, email }) => {
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    formData.append("avatar", avatar); // Assuming avatar is a File object
    formData.append("phone", phone);
    formData.append("email", email);

    const response = await fetch(API_URL + COLLECTION_NAME + "/register", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data;
  }
);

const unauthorizedUserState = {
  id: null,
  login: null,
  password: null,
  userData: null,
  loginStatus: "unauthorized",
  registerStatus: "unregistered",
  pendingAction: null,
  loginError: null,
  registerError: null,
};

const setAsLoggedInReducer = (state, action) => {
  const user = action.payload.user;
  user.id = user._id;
  state.id = user.id;
  state.loginName = user.login;
  state.userData = user;
  state.loginStatus = "authorized";
  state.registerStatus = "registered";
  state.pendingAction = null;
  state.registerError = null;
  state.logoutError = null;
  state.loginError = null;
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
    pendingAction: (state) => state.pendingAction,
    loginStatus: (state) => state.loginStatus,
    registerStatus: (state) => state.registerStatus,
    registerError: (state) => state.registerError,
    logoutError: (state) => state.logoutError,
    loginError: (state) => state.loginError,
  },

  extraReducers: (builder) => {
    // login cases
    builder.addCase(loginUser.pending, (state) => {
      state.pendingAction = "login";
      state.loginError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.pendingAction = null;
      if (action.payload.user) {
        setAsLoggedInReducer(state, action);
      } else {
        state.loginError = action.payload.message;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.pendingAction = null;
      state.loginError = action.error.message;
    });
    // logout cases
    builder.addCase(logout.pending, (state) => {
      state.pendingAction = "logout";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.pendingAction = null;
      state.logoutError = null;

      if (action.payload.message === "Logged out") {
        setAsLoggedOutReducer(state);
      } else {
        state.loginError = action.payload.message;
      }
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.pendingAction = null;
      state.loginError = action.error.message;
    });
    // register cases
    builder.addCase(registerUser.pending, (state) => {
      state.pendingAction = "register";
      state.registerError = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.pendingAction = null;

      if (action.payload.user) {
        state.registerStatus = "registered";
      } else {
        state.registerError = action.payload.message;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.pendingAction = null;
      state.registerError = action.error.message;
    });
  },
});

export default authSlice;
// export const { addMultiple, login } = authSlice.actions;
export const {
  currentUser,
  loginName,
  loginStatus,
  registerStatus,
  pendingAction,
  loginError,
  logoutError,
  registerError,
} = authSlice.selectors;
