const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// GET / 라우터
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.render("mongoose", { posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
