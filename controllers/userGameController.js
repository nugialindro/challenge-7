const { UserGame, UserGameBiodata } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  index: (req, res) => {
    UserGame.findAll({
      order: [["id", "ASC"]],
    }).then((usergames) => {
      res.render("pages/admin/index", {
        pageTitle: "Daftar User",
        usergames,
      });
    });
  },

  create: (req, res) => {
    res.render("pages/admin/create");
  },

  store: async (req, res, next) => {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const userGame = await UserGame.create({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      });
      await UserGameBiodata.create({
        userGameId: userGame.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      });
      res.redirect("/admin");
    } catch (err) {
      next(err);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await UserGameBiodata.destroy({
      where: {
        userGameId: id,
      },
    });

    await UserGame.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/admin");
  },

  update: async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const userGame = await UserGame.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      },
      { where: { id: req.params.id } }
    );

    await UserGameBiodata.update(
      {
        userGameId: userGame.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      },
      { where: { userGameId: req.params.id } }
    );
    res.redirect("/admin/user");
  },

  show: async (req, res) => {
    const { id } = req.params;
    const detail = await UserGame.findOne({
      where: {
        id: id,
      },
      include: "UserGameBiodata",
    });
    res.render("pages/admin/show", {
      pageTitle: `${UserGame.username} Data`,
      detail,
    });
  },

  editUser: async (req, res) => {
    const usergame = await UserGame.findOne({
      where: { id: req.params.id },
      include: "UserGameBiodata",
    });
    res.render("pages/admin/edit", {
      pageTitle: "Edit User",
      usergame,
    });
  },
};
