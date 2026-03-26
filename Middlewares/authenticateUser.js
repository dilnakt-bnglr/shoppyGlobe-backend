import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, "hiddenekeyforlogin", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid jwt token" });
    }

    req.user = user;
    next();
  });
}
