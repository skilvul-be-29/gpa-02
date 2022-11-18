import { expect } from "chai";
import { config } from "dotenv";
import mongoose, { Types } from "mongoose";
import supertest from "supertest";
import { app } from "../src/app.js";

config();

describe("Integration Testing", function () {
  const request = supertest(app);
  let token;
  let threadId;
  let commentId;

  before(async function () {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    await mongoose.connection.db.dropDatabase();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  describe("POST /auth/register", function () {
    it("should return 201", async function () {
      const response = await request.post("/auth/register").send({
        username: "user123",
        password: "asd",
      });
      expect(response.status).equals(201);
    });

    it("should return 409", async function () {
      const response = await request.post("/auth/register").send({
        username: "user123",
        password: "asd",
      });
      expect(response.status).equals(409);
    });
  });

  describe("POST /auth/login", function () {
    it("should return 200", async function () {
      const response = await request.post("/auth/login").send({
        username: "user123",
        password: "asd",
      });
      expect(response.status).equals(200);
      expect(response.body).to.have.property("token");
      token = response.body.token;
    });

    it("should return 401", async function () {
      const response = await request.post("/auth/login").send({
        username: "user123",
        password: "incorrectpassword",
      });
      expect(response.status).equals(401);
    });

    it("should return 404", async function () {
      const response = await request.post("/auth/login").send({
        username: "user1234",
        password: "asd",
      });
      expect(response.status).equals(404);
    });
  });

  // describe("GET /users/:username", function () {
  //   it("should return 200", async function () {
  //     const response = await request.get("/users/user123");
  //     expect(response.status).equals(200);
  //   });

  //   it("should return 404", async function () {
  //     const response = await request.get("/users/user1234");
  //     expect(response.status).equals(404);
  //   });
  // });

  describe("POST /threads", function () {
    it("should return 201", async function () {
      const response = await request
        .post("/threads")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "test",
          content: "test",
        });
      expect(response.status).equals(201);
      expect(response.body).to.have.property("_id");
      threadId = response.body._id;
    });

    it("should return 401", async function () {
      const response = await request.post("/threads").send({
        title: "test",
        content: "test",
      });
      expect(response.status).equals(401);
    });

    it("should return 401", async function () {
      const response = await request
        .post("/threads")
        .set("Authorization", `Bearer invalidtoken`)
        .send({
          title: "test",
          content: "test",
        });
      expect(response.status).equals(401);
    });
  });

  describe("GET /threads", function () {
    it("should return 200", async function () {
      const response = await request.get("/threads");
      expect(response.status).equals(200);
    });
  });

  describe("GET /threads/:id", function () {
    it("should return 200", async function () {
      console.log(`/threads/${threadId}`);
      const response = await request.get(`/threads/${threadId}`);
      expect(response.status).equals(200);
    });

    it("should return 404", async function () {
      const response = await request.get(`/threads/${Types.ObjectId}`);
      expect(response.status).equals(404, response.body.message);
    });
  });

  describe("PUT /threads/:id", function () {
    it("should return 200", async function () {
      const response = await request
        .put(`/threads/${threadId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "test2",
          content: "test2",
        });
      expect(response.status).equals(200);
    });

    it("should return 401", async function () {
      const response = await request.put(`/threads/${threadId}`).send({
        title: "test2",
        content: "test2",
      });
      expect(response.status).equals(401);
    });
  });

  describe("POST /threads/:id/comments", function () {
    it("should return 201", async function () {
      const response = await request
        .post(`/threads/${threadId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "test",
        });
      expect(response.status).equals(201);
      expect(response.body).to.have.property("_id");
      commentId = response.body._id;
    });

    it("should return 401", async function () {
      const response = await request
        .post(`/threads/${threadId}/comments`)
        .send({
          content: "test",
        });
      expect(response.status).equals(401);
    });
  });

  describe("PUT /threads/:threadId/comments/:commentId", function () {
    it("should return 200", async function () {
      const response = await request
        .put(`/threads/${threadId}/comments/${commentId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "test2",
        });
      expect(response.status).equals(200);
    });

    it("should return 401", async function () {
      const response = await request
        .put(`/threads/${threadId}/comments/${commentId}`)
        .send({
          content: "test2",
        });
      expect(response.status).equals(401);
    });
  });

  describe("DELETE /threads/:threadId/comments/:commentId", function () {
    it("should return 200", async function () {
      const response = await request
        .delete(`/threads/${threadId}/comments/${commentId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).equals(200);
    });

    it("should return 401", async function () {
      const response = await request.delete(
        `/threads/${threadId}/comments/${commentId}`
      );
      expect(response.status).equals(401);
    });
  });
});
