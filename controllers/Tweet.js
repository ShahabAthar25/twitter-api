const Tweet = require("../models/Tweet");
const {
  createTweetValidation,
  updateTweetValidation,
} = require("../utils/Validation");

const recommendations = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.id });

    res.json({
      message: {
        id: tweet._id,
        createdBy: tweet.createdBy,
        username: tweet.username,
        name: tweet.name,
        text: tweet.text,
        media: tweet.media,
        createdAt: tweet.createdAt,
        replies: tweet.replies,
      },
    });
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
        id: newTweet._id,
        createdBy: newTweet.createdBy,
        username: newTweet.username,
        name: newTweet.name,
        text: newTweet.text,
        media: newTweet.media,
        createdAt: newTweet.createdAt,
        replies: newTweet.replies,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTweet = async (req, res) => {
  const { error } = updateTweetValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.createdBy !== req.user._id) {
      return res
        .status(401)
        .json({ error: "You are not the creator of this tweet" });
    }
    await tweet.updateOne(req.body);

    res.json({ message: "Tweet has been updated" });
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
