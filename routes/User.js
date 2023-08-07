const router = require("express").Router();

const controller = require("../controllers/User");

router.get("/me", controller.getUser);
router.get("/:id", controller.getUser);
router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);
router.put("/follow/:id", controller.follow);
router.put("/unfollow/:id", controller.unfollow);

module.exports = router;
