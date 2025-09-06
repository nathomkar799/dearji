const jwt = require("jsonwebtoken");


//check if the user is logged in or not
function authMiddleware(req, res, next) {
  // Expecting header: "Authorization: Bearer <token>"
//   const authHeader = req.headers["authorization"];
  const token = req.cookies.token; //✅ read from cookie

  if (!token) {
    return res.status(401).json({ message: "❌ Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.secret_key);
    req.user = verified; // attach user info (id, username) to request
    next(); // proceed
  } catch (err) {
    return res.status(403).json({ message: "❌ Invalid or expired token." });
  }
}

module.exports = authMiddleware;
