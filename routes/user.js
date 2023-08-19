const express = require("express");
const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkMe = require("../middlewares/checkMe");
const validator = require("../middlewares/validator");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let users = await user.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let users = await user.findAll({ where: { email } });
    if (users.length > 0) {
      const passwordMatch = await bcrypt.compare(password, users[0].password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: users[0].id,
            userName: users[0].name,
          },
          "suman"
        );
        res.status(200).send({
          msg: "Login Successfull",
          token,
        });
      } else {
        res.status(404).send({ msg: "Wrong Credential" });
      }
    } else {
      res.status(404).send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/add", validator, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let userEmail = await user.findAll({ where: { email } });
    if (userEmail.length > 0) {
      res.status(404).send({
        msg: "User Already Exist pls try to login.",
      });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const userData = {
          name,
          email,
          password: hash,
        };
        let users = await user.create(userData);
        await users.save();
        res.status(200).send({ msg: "A new user added" });
      });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.use(checkMe);

userRouter.get("/account", async (req, res) => {
  const { userID } = req.body;
  try {
    const users = await user.findOne({ where: { id: userID } });
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = userRouter;
