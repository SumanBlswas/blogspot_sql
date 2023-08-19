const jwt = require("jsonwebtoken");

const checkMe = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, "suman");
      req.body.userID = decoded.userID;
      req.body.userName = decoded.userName;
      next();
    } catch (error) {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

module.exports = checkMe;
