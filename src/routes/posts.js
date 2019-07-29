import express from "express";
import Post from "../models/Post";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }

  res.send("You're on the posting page.");
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({ title, description });

  try {
    const data = await post.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.remove({ _id: req.params.postId });
    res.json(deletedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
