const Tweet = require("../models/Tweet");
const User = require("../models/User");
const HashTag = require("../models/HashTag");
const {
  createTweetValidation,
  updateTweetValidation,
} = require("../utils/Validation");
const extractInfo = require("../utils/extractInfo");

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
        trends: tweet.trends,
        createdAt: tweet.createdAt,
        replies: tweet.replies,
        likes: tweet.likes.length,
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
    const { hashTags, mentions } = extractInfo(req.body.text);

    const newTweet = new Tweet({
      createdBy: req.user._id,
      username: req.user.username,
      name: req.user.name,
      text: req.body.text,
      trends: hashTags,
    });

    const hashTagsPromise = hashTags.map(async (hashTag) => {
      const hashTagDocument = await HashTag.findOne({ name: hashTag });

      if (hashTagDocument) return;

      const newHashTag = await HashTag({
        name: hashTag,
      });

      newHashTag.save();
    });

    await Promise.all(hashTagsPromise);

    const mentionsPromise = mentions.map(async (username) => {
      const user = await User.findOne({ username: username });
      if (user) {
        await user.updateOne({
          $push: {
            notifications: {
              text: `You have been mentioned by ${newTweet.name} (@${newTweet.username})`,
              post: newTweet._id,
            },
          },
        });
      }
    });

    await Promise.all(mentionsPromise);

    newTweet.save();

    if (newTweet.text)
      res.json({
        message: {
          id: newTweet._id,
          createdBy: newTweet.createdBy,
          username: newTweet.username,
          name: newTweet.name,
          text: newTweet.text,
          media: newTweet.media,
          trends: newTweet.trends,
          createdAt: newTweet.createdAt,
          replies: newTweet.replies,
          likes: newTweet.likes,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTweet = async (req, res) => {
  const { error } = updateTweetValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const tweet = await Tweet.findById(req.params.id);

    const currentDate = new Date();
    const timeDifference = currentDate - tweet.createdAt;

    if (timeDifference >= 15 * 60 * 1000) {
      return res
        .status(400)
        .json({ error: "Cannot edit tweet after 15 minutes" });
    }

    if (tweet.createdBy !== req.user._id) {
      return res
        .status(401)
        .json({ error: "You are not the creator of this tweet" });
    }

    await tweet.updateOne(req.body);

    res.json({ message: "Tweet has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (tweet.createdBy !== req.user._id) {
      return res
        .status(401)
        .json({ error: "You are not the creator of this tweet" });
    }

    await tweet.deleteOne();

    res.json({ messgae: "Tweet has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (tweet.createdBy === req.user._id) {
      return res.status(400).json({ error: "You cannot like your own tweet" });
    }

    if (!tweet.likes.includes(req.user._id)) {
      await tweet.updateOne({
        $addToSet: {
          likes: req.user._id,
        },
      });

      await User.findOneAndUpdate(tweet.createdBy, {
        $push: {
          notifications: {
            text: `${req.user.name} (@${req.user.username}) liked your tweet`,
            post: tweet._id,
          },
        },
      });

      res.json({ message: "The tweet has been liked" });
    } else {
      await tweet.updateOne({
        $pull: {
          likes: req.user._id,
        },
      });

      await User.findOneAndUpdate(tweet.createdBy, {
        $push: {
          notifications: {
            text: `${req.user.name} (@${req.user.username}) unliked your tweet`,
            post: tweet._id,
          },
        },
      });

      res.json({ message: "The tweet has been unliked" });
    }
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
