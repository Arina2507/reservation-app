const request = require("supertest");
const app = require("../src/app");

describe("Integration tests", () => {
  it("should reject early reservation", async () => {
    const res = await request(app)
      .post("/reservations")
      .send({ user: "C", time: "08:00" });

    expect(res.statusCode).toBe(400);
  });

  it("should reject duplicate user", async () => {
    await request(app)
      .post("/reservations")
      .send({ user: "D", time: "11:00" });

    const res = await request(app)
      .post("/reservations")
      .send({ user: "D", time: "12:00" });

    expect(res.statusCode).toBe(400);
  });
});