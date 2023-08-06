const router = require("express").Router();

const controller = require("../controllers/Auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.delete("/logout", controller.logout);
router.post("/forgot", controller.forgotPwd);

module.exports = router;
