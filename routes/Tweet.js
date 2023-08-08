const router = require("express").Router();

const controller = require("../controllers/Tweet");

router.get("/recommendations", controller.recommendations);
router.get("/:id", controller.getTweet);
router.post("/", controller.createTweet);
router.put("/:id", controller.updateTweet);
router.delete("/:id", controller.deleteTweet);
router.put("/:id/like", controller.likeTweet);

module.exports = router;
