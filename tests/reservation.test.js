const request = require("supertest");
const app = require("../src/app");

describe("Reservation API", () => {
  it("should create reservation", async () => {
    const res = await request(app)
      .post("/reservations")
      .send({ user: "A", time: "10:00" });

    expect(res.statusCode).toBe(201);
  });
});