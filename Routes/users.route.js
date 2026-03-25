import createUser from "../Controllers/users.contoller.js";
import validateInputs from "../Middlewares/vailidateInputs.js";

// created route for user endpoints
export function userRoutes(app) {
  // POST - User Registration
  app.post("/api/register", validateInputs, createUser);
}
