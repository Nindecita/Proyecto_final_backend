import request from "supertest";
import app from "../server.js";
import { generateToken } from "./utils/loginTest.js";
import { findUsers } from "./utils/findUser.js";
import { faker } from '@faker-js/faker';

const TOKEN = generateToken();

describe("Operation to test search by user_id", () => {
  it("Debe responder con un código 200", async () => {
    const user_id = await findUsers();
    const res = await request(app)
      .get(`/api/find_user_by_id/${user_id}`)
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(res.status).toBe(200);
  });
});

describe("Operation to test search all publications", () => {
  it("Debe responder con un código 200", async () => {
    const res = await request(app)
      .get("/api/publication_all")
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(res.status).toBe(200);
  });
});

describe("Operation to test the search for publications by user_id", () => {
  it("Debe responder con un código 200", async () => {
    const user_id = await findUsers();
    const res = await request(app)
      .get(`/api/publication_user_by_id/${user_id}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
  });
});

describe("Operation to test the creation of a user", () => {
  it("Debe responder con un código 200", async () => {
    const payload = {
      email: faker.internet.email(),
      password: "papaya",
      name: "paz",
      lastName: "arancibia",
      nick_name: "ninde",
      image: "https://logowik.com/content/uploads/images/nodejs.jpg",
    };

    const res = await request(app).post("/api/create_user").send(payload);

    expect(res.status).toBe(200);
  });
});
