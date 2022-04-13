import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("No token Provided");
  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    /*  console.log(decoded, req.user); */
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default auth;
