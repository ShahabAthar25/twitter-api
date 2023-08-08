const Tweet = require("../models/Tweet");
const { createTweetValidation } = require("../utils/Validation");

const recommendations = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTweet = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTweet = async (req, res) => {
  const { error } = createTweetValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newTweet = new Tweet({
      createdBy: req.user._id,
      username: req.user.username,
      name: req.user.name,
      text: req.body.text,
    });

    newTweet.save();

    res.json({
      message: {
        createdBy: newTweet.createdBy,
        username: newTweet.username,
        name: newTweet.name,
        text: newTweet.text,
        media: newTweet.media,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTweet = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTweet = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likeTweet = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  recommendations,
  getTweet,
  createTweet,
  updateTweet,
  deleteTweet,
  likeTweet,
};
