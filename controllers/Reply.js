const Tweet = require("../models/Tweet");
const Reply = require("../models/Reply");
const { replyValidation } = require("../utils/Validation");

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
  const { error } = replyValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const reply = await Reply.findById(req.params.id);

    const currentDate = new Date();
    const timeDifference = currentDate - reply.createdAt;

    if (timeDifference >= 15 * 60 * 1000) {
      return res
        .status(400)
        .json({ error: "Cannot edit reply after 15 minutes" });
    }

    if (reply.createdBy !== req.user._id) {
      return res
        .status(401)
        .json({ error: "You are not the creator of this reply" });
    }

    await reply.updateOne(req.body);

    res.json({ message: "Reply has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (reply.createdBy !== req.user._id) {
      return res
        .status(401)
        .json({ error: "You are not the creator of this reply" });
    }

    await reply.deleteOne();

    res.json({ message: "Reply has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likeReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (reply.createdBy === req.user._id) {
      return res.status(400).json({ error: "You cannot like your own reply" });
    }

    if (!reply.likes.includes(req.user._id)) {
      await reply.updateOne({
        $addToSet: {
          likes: req.user._id,
        },
      });

      await User.findOneAndUpdate(reply.createdBy, {
        $push: {
          notifications: {
            text: `${req.user.name} (@${req.user.username}) liked your reply`,
            reply: reply._id,
          },
        },
      });

      res.json({ message: "The reply has been liked" });
    } else {
      await reply.updateOne({
        $pull: {
          likes: req.user._id,
        },
      });

      await User.findOneAndUpdate(reply.createdBy, {
        $push: {
          notifications: {
            text: `${req.user.name} (@${req.user.username}) unliked your reply`,
            reply: reply._id,
          },
        },
      });

      res.json({ message: "The reply has been unliked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createReply,
  updateReply,
  deleteReply,
  likeReply,
};
