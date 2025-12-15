import jwt from "jsonwebtoken";

export function Authorization(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({ error: "no token provided unauthorized" });
  }

  // to take toke without barrer keyword
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "token missing unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.TOKENSECRETKEY);
    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).send({ error: "invalid or expired token" });
  }
}
