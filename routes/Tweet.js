const router = require("express").Router();

const controller = require("../controllers/Tweet");

router.get("/recommendations", controller.recommendations);
router.get("/:id", controller.getTweet);
router.post("/", controller.createTweet);
router.put("/", controller.updateTweet);
router.delete("/", controller.deleteTweet);
router.put("/like", controller.likeTweet);

module.exports = router;
