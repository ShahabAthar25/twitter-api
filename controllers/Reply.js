const getReply = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createReply = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
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
