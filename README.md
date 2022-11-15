# GPA-02

## API Endpoints

| Method | Endpoint                  | Description                   | Additional Info |
| ------ | ------------------------- | ----------------------------- | --------------- |
| GET    | /threads                  | Get all threads               |                 |
| GET    | /threads/:id              | Get a thread by id            |                 |
| POST   | /threads                  | Create a thread               |                 |
| PUT    | /threads/:id              | Update a thread               |                 |
| DELETE | /threads/:id              | Delete a thread               |                 |
| GET    | /threads/:id/comments     | Get all comments for a thread |                 |
| GET    | /threads/:id/comments/:id | Get a comment by id           |                 |
| POST   | /threads/:id/comments     | Create a comment              |                 |
| PUT    | /threads/:id/comments/:id | Update a comment              |                 |
| DELETE | /threads/:id/comments/:id | Delete a comment              |                 |
| GET    | /users                    | Get all users                 |                 |
| GET    | /users/:id                | Get a user by id              |                 |
| POST   | /users                    | Create a user                 |                 |
| PUT    | /users/:id                | Update a user                 |                 |
| DELETE | /users/:id                | Delete a user                 |                 |
| GET    | /campuses                 | Get all campuses              |                 |
| GET    | /campuses/:id             | Get a campus by id            |                 |
| POST   | /campuses                 | Create a campus               |                 |
| PUT    | /campuses/:id             | Update a campus               |                 |
| DELETE | /campuses/:id             | Delete a campus               |                 |

## Environment Variables

| Name        | Description               |
| ----------- | ------------------------- |
| PORT        | Server Port               |
| JWT_SECRET  | JWT Secret                |
| MONGODB_URI | MongoDB Connection String |
