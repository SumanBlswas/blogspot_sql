const validator = (req, res, next) => {
  const { email, password, name } = req.body;
  const method = req.method;
  if (method === "POST" || method === "PATCH") {
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(404).send({ msg: "type error" });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = validator;
