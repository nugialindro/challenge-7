const { PlayerUser, PlayerUserBiodata } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  index: (req, res) => {
    PlayerUser.findAll({
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
      const userGame = await PlayerUser.create({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      });
      await PlayerUserBiodata.create({
        playerUserId: userGame.id,
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
    await PlayerUserBiodata.destroy({
      where: {
        playerUserId: id,
      },
    });

    await PlayerUser.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/admin");
  },

  update: async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const playerUser = await PlayerUser.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      },
      { where: { id: req.params.id } }
    );

    await PlayerUserBiodata.update(
      {
        userGameId: playerUser.id,
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
    const detail = await PlayerUser.findOne({
      where: {
        id: id,
      },
      include: "PlayerUserBiodata",
    });
    res.render("pages/admin/show", {
      pageTitle: `${PlayerUser.username} Data`,
      detail,
    });
  },

  editUser: async (req, res) => {
    const usergame = await PlayerUser.findOne({
      where: { id: req.params.id },
      include: "PlayerUserBiodata",
    });
    res.render("pages/admin/edit", {
      pageTitle: "Edit User",
      usergame,
    });
  },
};
