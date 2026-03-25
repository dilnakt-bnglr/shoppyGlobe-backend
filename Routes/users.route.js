import createUser from "../Controllers/users.contoller.js";
import validateInputs from "../Middlewares/vailidateInputs.js";

export function userRoutes(app) {
  app.post("/api/register", validateInputs, createUser);
}
