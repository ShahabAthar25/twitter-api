const router = require("express").Router();

const controller = require("../controllers/User");

router.get("/me", controller.getCurrentUser);
router.get("/:id", controller.getUser);
router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);
router.put("/:id/follow", controller.follow);

module.exports = router;
