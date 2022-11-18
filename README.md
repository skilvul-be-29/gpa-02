# GPA-02

## API Endpoints

| Method | Endpoint                  | Description                   | Additional Info         |
| ------ | ------------------------- | ----------------------------- | ----------------------- |
| POST   | /auth/login               | Login                         |                         |
| POST   | /auth/register            | Register                      |                         |
| GET    | /campuses                 | Get all campuses              |                         |
| GET    | /campuses/:id             | Get a campus by id            |                         |
| GET    | /threads                  | Get all threads               |                         |
| GET    | /threads/:id              | Get a thread by id            |                         |
| POST   | /threads                  | Create a thread               | Requires Authentication |
| PUT    | /threads/:id              | Update a thread               | Requires Authentication |
| DELETE | /threads/:id              | Delete a thread               | Requires Authentication |
| GET    | /threads/:id/comments     | Get all comments for a thread |                         |
| GET    | /threads/:id/comments/:id | Get a comment by id           |                         |
| POST   | /threads/:id/comments     | Create a comment              | Requires Authentication |
| PUT    | /threads/:id/comments/:id | Update a comment              | Requires Authentication |
| DELETE | /threads/:id/comments/:id | Delete a comment              | Requires Authentication |
| GET    | /users                    | Get all users                 |                         |
| GET    | /users/:id                | Get a user by id              |                         |

## Environment Variables

| Name        | Description               |
| ----------- | ------------------------- |
| PORT        | Server Port               |
| JWT_SECRET  | JWT Secret                |
| MONGODB_URI | MongoDB Connection String |
