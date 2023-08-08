const Tweet = require("../models/Tweet");
const Reply = require("../models/Reply");
const { replyValidation } = require("../utils/Validation");

const getReply = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createReply = async (req, res) => {
  const { error } = replyValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    let parent = await Tweet.findById(req.params.id);
    if (!parent) {
      parent = await Reply.findById(req.params.id);
      if (!parent) {
        res.status(404).json({
          error: `No post or reply exists with the id ${req.params.id}`,
        });
      }
    }

    const newReply = new Reply({
      createdBy: req.user._id,
      username: req.user.username,
      name: req.user.name,
      parent: req.params.id,
      text: req.body.text,
    });

    await newReply.save();

    await parent.updateOne({
      $addToSet: {
        replies: newReply._id,
      },
    });

    res.json({
      message: {
        id: newReply._id,
        createdBy: newReply.createdBy,
        username: newReply.username,
        name: newReply.name,
        parent: newReply.parent,
        text: newReply.text,
        media: newReply.media,
        replies: newReply.replies,
        likes: newReply.likes.length,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReply = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReply = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likeReply = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getReply,
  createReply,
  updateReply,
  deleteReply,
  likeReply,
};
