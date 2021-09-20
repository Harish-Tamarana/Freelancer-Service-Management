const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  console.log("in the validator");
  console.log(req.headers);
  const token = req.header("auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verify = jwt.verify(token, process.env.DB_TOKEN);
    req.user = verify;

    console.log("Verified and run");
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
