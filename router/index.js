const express = require("express");
const pagesController = require("../controllers/pagesController");
const userGameController = require("../controllers/userGameController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/register", authController.registerpage);
router.post("/register", authController.register);
router.get("/", pagesController.loginpage);
router.get("/login", pagesController.loginpage);
router.post("/login", authController.login);
router.get("/admin", pagesController.dashboard);
router.get("/admin/create", userGameController.create);
router.get("/admin/user", userGameController.index);
router.get("/admin/:id", userGameController.show);
router.get("/admin/:id/edit", userGameController.editUser);
router.put("/admin/edit/:id", userGameController.update);
router.post("/admin/create", userGameController.store);
router.delete("/admin/:id", userGameController.destroy);

module.exports = router;
