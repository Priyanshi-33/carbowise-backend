import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ msg: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};
