const express = require("express");
const pagesController = require("../controllers/pagesController");
const userGameController = require("../controllers/userGameController");
const authController = require("../controllers/authController");
const apiController = require("../controllers/apiController");
const restrict = require("../middlewares/restrict");
const restrictUser = require("../middlewares/restrictUser");
const router = express.Router();

router.post("/api/v1/auth/register", apiController.register);
router.post("/api/v1/auth/login", restrictUser, apiController.login);
router.get("/api/v1/user", restrictUser, apiController.index);

router.get("/register", authController.registerpage);
router.post("/register", authController.register);
router.get("/", pagesController.loginpage);
router.get("/login", pagesController.loginpage);
router.post("/login", authController.login);
router.get("/admin", restrict, pagesController.dashboard);
router.get("/admin/create", userGameController.create);
router.get("/admin/user", userGameController.index);
router.get("/admin/:id", userGameController.show);
router.get("/admin/:id/edit", userGameController.editUser);
router.put("/admin/edit/:id", userGameController.update);
router.post("/admin/create", userGameController.store);
router.delete("/admin/:id", userGameController.destroy);

module.exports = router;
