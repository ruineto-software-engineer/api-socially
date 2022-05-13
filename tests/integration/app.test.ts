import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

describe("POST /users", () => {
  it.todo("should return 201 and persist the user given a valid body");
});
