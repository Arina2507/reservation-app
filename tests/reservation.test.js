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

it("should fail on duplicate time", async () => {
  await request(app)
    .post("/reservations")
    .send({ user: "A", time: "10:00" });

  const res = await request(app)
    .post("/reservations")
    .send({ user: "B", time: "10:00" });

  expect(res.statusCode).toBe(400);
});