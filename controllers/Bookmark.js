const Tweet = require("../models/Tweet");
const User = require("../models/User");

const viewBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const bookmarksPromise = user.bookmarks.map(async (id) => {
      const tweet = await Tweet.findById(id);

      return {
        id: tweet._id,
        createdBy: tweet.createdBy,
        username: tweet.username,
        name: tweet.name,
        text: tweet.text,
        media: tweet.media,
        likes: tweet.likes.length,
        createdAt: tweet.createdAt,
      };
    });

    const bookmarks = await Promise.all(bookmarksPromise);

    res.json({ message: bookmarks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBookmark = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        bookmarks: tweet._id,
      },
    });

    res.json({ message: "Tweet added to bookmarks" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        bookmarks: tweet._id,
      },
    });

    res.json({ message: "Tweet removed to bookmarks" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  viewBookmarks,
  createBookmark,
  deleteBookmark,
};
