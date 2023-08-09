const router = require("express").Router();

const controller = require("../controllers/Bookmark");

router.get("/", controller.viewBookmarks);
router.post("/:id", controller.createBookmark);
router.delete("/:id", controller.deleteBookmark);

module.exports = router;
