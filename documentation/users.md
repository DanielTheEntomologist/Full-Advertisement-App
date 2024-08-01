# Show All Users

Get the details of all users in the system.

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a list of users in the local database.

```json
[
  {
    "_id": "66aa543",
    "login": "testUser1",
    "password": "****************",
    "avatar": "public\\avatars\\avatar-1.jpg",
    "phone": "+48 506 193 214",
    "salt": "****************",
    "__v": 0
  },
  {
    "_id": "66aa543",
    "login": "testUser2",
    "password": "****************",
    "avatar": "public\\avatars\\avatar-2.jpg",
    "phone": "+48 506 193 215",
    "salt": "****************",
    "__v": 0
  }
]
```

# Show User by ID

Get the details of a specific user by their ID.

**URL** : `/api/users/:id`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## URL Parameters

- `id` (string) : The ID of the user to retrieve.

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 66aa543 on the local database.

```json
{
    "_id": "66aa543",
    "login": "testUser2",
    "password": "****************",
    "avatar": "public\\avatars\\avatar-2.jpg",
    "phone": "+48 506 193 215",
    "salt": "****************",
    "__v": 0
  }
}
```
