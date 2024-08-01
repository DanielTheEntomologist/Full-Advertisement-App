# Ad Site API

API for database of Adverts.

## Open Endpoints

Open endpoints require no Authentication.

- [All Users](users.md) : `GET /api/users/`
- [User](users.md) : `GET /api/users/:id`
- [Register User](auth.md) : `POST /api/auth/register`
- [Login](auth.md) : `POST /api/auth/login`

## Endpoints that require Authentication

Closed endpoints require a user browser to have correct session cookie.
A Session can be established using the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose session is part of the request:

- [Show current user](auth.md) : `GET /api/auth/user`
- [Logout current user](auth.md) : `DELETE /api/auth/logout`
- [Delete current user](auth.md) : `DELETE /api/auth/remove`

### Adverts related

Endpoints for viewing and manipulating the Adverts that the Authenticated User
has permissions to access.

- [Get all ads](ads.md) : `GET /api/ads/`
- [Get specific ad](ads.md) : `GET /api/ads/:id/`
- [Create an ad](ads.md) : `POST /api/accounts/`

- [Update An Account](ads.md) : `PUT /api/accounts/:pk/`
- [Delete An Account](ads.md) : `DELETE /api/accounts/:pk/`
