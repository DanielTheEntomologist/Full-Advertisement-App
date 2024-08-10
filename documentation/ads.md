Sometime in the future.

# API Endpoint Documentation: /api/ads

## Description

This API endpoint is used to retrieve and manage advertisements.

### 1. Get All Ads

- **URL:** `/api/ads`
- **Method:** `GET`
- **Description:** Get all ads.
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json{
    [
    {
    "_id": "66aa837fb6c3ec0f84fd2b5c" ,
    "title": "Test Advert 4",
    "content": "Test Content Dorem solorem ipsum",
    "date": {
    "$date": "2022-09-14T22:00:00.000Z"
    },
    "image": "public\\avatars\\image-1722450815555-544123689.jpg",
    "price": 10000,
    "location": "Moon City 11",
    "seller": "66aa543507690f436c77cb46",
    "__v": 0
    },
    {
    "_id": "66aa7bdb746ec548544ffbec",
    "title": "Test Advert 1",
    "content": "Test Content Dorem solorem ipsum",
    "date": {
    "$date": "2022-09-14T22:00:00.000Z"
    },
    "image": "public\\avatars\\image-1722448859206-995222211.jpg",
    "price": 10000,
    "location": "Moon City 11",
    "seller": "66aa543507690f436c77cb46",
    "__v": 0
    }]}
    ```
  - **Status:** `400 Bad Request` (if validation fails)

### 2. Get specific ad

- **URL:** `/api/ads/:id`
- **Method:** `GET`
- **Description:** Get specific ad.
- **Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    {
      "_id": "66aa837fb6c3ec0f84fd2b5c",
      "title": "Test Advert 4",
      "content": "Test Content Dorem solorem ipsum",
      "date": {
        "$date": "2022-09-14T22:00:00.000Z"
      },
      "image": "public\\avatars\\image-1.jpg",
      "price": 10000,
      "location": "Moon City 11",
      "seller": "66aa543507690f436c77cb46",
      "__v": 0
    }
    ```

  - **Status:** `400 Bad Request` (if validation fails)

### 3. Create an Ad

- **URL:** `/api/ads/`
- **Method:** `POST`
- **Description:** Create an Ad.
- **Headers:**
  - The session cookie is included in the headers of the request for authentication.
- **Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    {
      "_id": "66aa837fb6c3ec0f84fd2b5c",
      "title": "Test Advert 4",
      "content": "Test Content Dorem solorem ipsum",
      "date": {
        "$date": "2022-09-14T22:00:00.000Z"
      },
      "image": "public\\avatars\\image-1722450815555-544123689.jpg",
      "price": 10000,
      "location": "Moon City 11",
      "seller": "66aa543507690f436c77cb46",
      "__v": 0
    }
    ```

  - **Status:** `400 Bad Request` (if validation fails)

## Endpoint

````

/api/ads

```

## Methods

- GET: Retrieve all advertisements
- POST: Create a new advertisement
- PUT: Update an existing advertisement
- DELETE: Delete an advertisement

## Parameters

- None

## Request Headers

- Content-Type: application/json

## Request Body (POST and PUT)

The request body should contain a JSON object with the following properties:

- title (string): The title of the advertisement
- description (string): The description of the advertisement
- price (number): The price of the advertisement

## Response

The response will be a JSON object with the following properties:

- id (string): The unique identifier of the advertisement
- title (string): The title of the advertisement
- description (string): The description of the advertisement
- price (number): The price of the advertisement
- createdAt (string): The timestamp when the advertisement was created
- updatedAt (string): The timestamp when the advertisement was last updated

## Example Requests

### GET /api/ads

```

GET /api/ads

```

### POST /api/ads

```

POST /api/ads
Content-Type: application/json

{
"title": "New Ad",
"description": "This is a new advertisement",
"price": 10.99
}

```

### PUT /api/ads/{id}

```

PUT /api/ads/123
Content-Type: application/json

{
"title": "Updated Ad",
"description": "This is an updated advertisement",
"price": 19.99
}

```

### DELETE /api/ads/{id}

```

DELETE /api/ads/123

```

```
````
