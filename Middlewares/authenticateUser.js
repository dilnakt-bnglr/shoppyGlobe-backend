import jwt from "jsonwebtoken";

// Middleware for user authentication
export function authenticateUser(req, res, next) {
  // Getting the authorization header from request
  const authHeader = req.headers["authorization"];
  // Taking the token from the Authorization header
  const token = authHeader && authHeader.split(" ")[1];

  // Verify token using the secret key  appending the user object to request
  jwt.verify(token, "hiddenekeyforlogin", (err, user) => {
    // Error handling if jwt token invalid
    if (err) {
      return res.status(401).json({ message: "Invalid jwt token" });
    }
    // Appending the user object to request
    req.user = user;
    next();
  });
}
