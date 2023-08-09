const router = require("express").Router();

const controller = require("../controllers/Disscussion");

router.get("/:id", controller.viewDisscussion);

module.exports = router;
