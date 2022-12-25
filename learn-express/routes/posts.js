const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        nickname: req.body.nickname,
      });
      console.log(post);
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        where: { id: req.params.id },
      });
      res.json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Post.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
