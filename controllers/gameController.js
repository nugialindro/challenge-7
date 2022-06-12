const { Room, PlayGame } = require("../models");
const wait = {};
const data = {}; // Ini ceritanya model disimpen ke database
let p1;

function waitEnemyResponse(id) {
  return new Promise((resolve) => {
    wait[id] = { resolve };
  });
}

const resultCondition = (p1, p2) => {
  if (p1 === p2) {
    return "Draw";
  }
  if (p1 === "rock") {
    return p2 === "scissors" ? "player 1 Win " : "player 1 Lose";
  }
  if (p1 === "papper") {
    return p2 === "rock" ? "player 1 Win " : "player 1 Lose";
  }
  if (p1 === "scissors") {
    return p2 === "papper" ? "player 1 Win " : "player 1 Lose";
  }
};

module.exports = {
  createRoom: async (req, res) => {
    try {
      const { roomName } = req.body;
      const room = await Room.create({
        roomName,
      });
      res.json(room);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },

  playGame: async (req, res) => {
    const id = req.params.id;

    const roomExist = await PlayGame.findAll({ where: { roomId: id } });

    console.log(roomExist[roomExist.length - 1]);
    if (roomExist.length >= 3 && roomExist[roomExist.length - 1].p2Choose !== null) return res.json({ Result: roomExist });

    if (!data[id]) {
      // Player 1 memilih
      data[id] = {
        player1: req.body.choose,
        player2: null,
      };
    } else {
      // Player 2 memilih
      data[id].player2 = req.body.choose;
    }

    if (!wait[id]) {
      p1 = req.body.p1Choose;
      await PlayGame.create({
        roomId: id,
        p1Choose: req.body.p1Choose,
      });
      await waitEnemyResponse(id);
    } else {
      await PlayGame.update(
        {
          p2Choose: req.body.p2Choose,
          result: resultCondition(p1, req.body.p2Choose),
        },
        {
          where: {
            roomId: id,
            p2Choose: null,
          },
        }
      );
      wait[id].resolve();
      delete wait[id];
    }

    res.json(data[id]);
  },
};
