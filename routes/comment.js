const express = require("express");
const { comment } = require("../models");
const checkMe = require("../middlewares/checkMe");

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
  try {
    const body = await comment.findAll();
    res.status(200).send(body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

commentRouter.get("/:id", async (req, res) => {
  try {
    const body = await comment.findAll({
      where: { post_id: req.params.id },
    });
    res.status(200).send(body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

commentRouter.use(checkMe);

commentRouter.post("/", async (req, res) => {
  try {
    const { content, userID, userName, post_id } = req.body;
    const data = await comment.create({ content, userID, userName, post_id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = commentRouter;
