## Endpoints

### 1. Register User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `login` (string) - The username of the user.
  - `avatar` (file) - The avatar image file for the user.
  - `password` (string) - The password for the user.
  - `phone` (string) - The phone number of the user.
- **Response:**
  - **Status:** `201 Created`
  - **Body:**
    ```json
    {
      "_id": "66aa543",
      "login": "testUser1",
      "password": "****************",
      "avatar": "public\\avatars\\avatar-1.jpg",
      "phone": "+48 506 193 214",
      "salt": "****************",
      "__v": 0
    }
    ```
  - **Status:** `400 Bad Request` (if validation fails)

### 2. Login User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Login an existing user.
- **Request Body:**
  - `username` (string) - The username of the user.
  - `password` (string) - The password for the user.
- **Response:**
  - **Status:** `200 OK`
  - **Headers:**
    - `Set-Cookie` - The session cookie is set in the response headers.
  - **Body:**
    ```json
    {
      "message": "Login successful"
    }
    ```
  - **Status:** `401 Unauthorized` (if credentials are incorrect)

### 3. Get Current User

- **URL:** `/auth/user`
- **Method:** `GET`
- **Description:** Retrieve the details of the currently authenticated user.
- **Headers:**
  - The session cookie is included in the headers of the request for authentication.
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    { "message": "Current user is: testUser1" }
    ```
  - **Status:** `401 Unauthorized` (if not authenticated)

### 4. Logout User

- **URL:** `/auth/logout`
- **Method:** `DELETE`
- **Description:** Logout the currently authenticated user.
- **Headers:**
  - The session cookie is included in the headers of the request for authentication.
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```
  - **Status:** `401 Unauthorized` (if not authenticated)

### 5. Remove User

- **URL:** `/auth/remove`
- **Method:** `DELETE`
- **Description:** Remove the currently authenticated user.
- **Headers:**
  - The session cookie is included in the headers of the request for authentication.
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "message": "User testUser1 removed and logged out"
    }
    ```
  - **Status:** `401 Unauthorized` (if not authenticated)
