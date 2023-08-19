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
      EndPoints: [
        {
          "For GET":
            "http://ec2-16-171-140-201.eu-north-1.compute.amazonaws.com/blogs",
        },
        {
          "For GET with ID":
            "http://ec2-16-171-140-201.eu-north-1.compute.amazonaws.com/blogs/:id",
        },
        {
          "For POST":
            "http://ec2-16-171-140-201.eu-north-1.compute.amazonaws.com/blogs",
        },
        {
          "For PUT":
            "http://ec2-16-171-140-201.eu-north-1.compute.amazonaws.com/blogs/:id",
        },
        {
          "For DELETE with ID":
            "http://ec2-16-171-140-201.eu-north-1.compute.amazonaws.com/blogs/:id",
        },
      ],
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
