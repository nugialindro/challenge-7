const { SuperAdmin } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("../lib/passport");

module.exports = {
  registerpage: (req, res) => {
    res.render("pages/register/register", { layout: "layouts/login" });
  },

  register: async (req, res, next) => {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      await SuperAdmin.create({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      });
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },

  login: passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  }),
};
