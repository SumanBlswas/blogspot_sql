const express = require("express");
const { blog } = require("../models");
const checkMe = require("../middlewares/checkMe");

const perticularBlogRouter = express.Router();

perticularBlogRouter.use(checkMe);

perticularBlogRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const body = await blog.findAll({ where: { userID } });
    res.status(200).send(body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = perticularBlogRouter;
