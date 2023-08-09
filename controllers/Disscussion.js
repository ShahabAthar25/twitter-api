const Tweet = require("../models/Tweet");
const Reply = require("../models/Reply");

const viewDisscussion = async (req, res) => {
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

    const discussion = [
      {
        id: parent.id,
        createdBy: parent.createdBy,
        username: parent.username,
        name: parent.name,
        text: parent.text,
        media: parent.media,
        likes: parent.likes.length,
        createdAt: parent.createdAt,
      },
    ];

    let parent_post = parent.parent;

    while (true) {
      if (typeof parent_post === "function") {
        break;
      }

      let parent = await Tweet.findById(parent_post);
      if (!parent) {
        parent = await Reply.findById(parent_post);
        if (!parent) {
          break;
        }
      }

      discussion.push({
        id: parent.id,
        createdBy: parent.createdBy,
        username: parent.username,
        name: parent.name,
        text: parent.text,
        media: parent.media,
        likes: parent.likes.length,
        createdAt: parent.createdAt,
      });
      parent_post = parent.parent;
    }

    discussion.reverse();

    res.json({ message: discussion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  viewDisscussion,
};
