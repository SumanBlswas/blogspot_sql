const express = require("express");
const db = require("./models");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const cors = require("cors");
const perticularBlogRouter = require("./routes/perticularblog");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).send({
      Hello: "Hello Api",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/perticular_blogs", perticularBlogRouter);
app.use("/comments", commentRouter);

app.listen(3003, async () => {
  try {
    await db.sequelize.sync();
    console.log("connected to the server");
  } catch (error) {
    console.log(error.message);
  }
});
