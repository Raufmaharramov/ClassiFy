const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("Should create a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Miklik",
      email: "mikilik@test.com",
      password: "miksssss23!"
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test("should login the user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistance user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "abdullah21@getMaxListeners.com",
      password: userOne.password
    })
    .expect(400);
});

test("Should get user profile", async () => {
  await request(app).get("/users/me").set("Authorization", `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});

test("Should not get user profile", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete user account", async () => {
  const response = await request(app).delete("/users/me").set("Authorization", `Bearer ${userOne.tokens[0].token}`).send().expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete user account", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload profile pics", async () => {
  await request(app).post("/users/me/avatar").set("Authorization", `Bearer ${userOne.tokens[0].token}`).attach("avatar", "test/fixtures/profile-pic.jpg").expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update user's field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "jess"
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("jess");
});

test("Should not update user's field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      area: "brooklyn"
    })
    .expect(400);
});
