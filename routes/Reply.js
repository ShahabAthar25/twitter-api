const router = require("express").Router();

const controller = require("../controllers/Reply");

router.get("/:id", controller.getReply);
router.post("/:id", controller.createReply);
router.put("/:id", controller.updateReply);
router.delete("/:id", controller.deleteReply);
router.put("/:id/like", controller.likeReply);

module.exports = router;
