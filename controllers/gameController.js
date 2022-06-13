const { Room, PlayGame, PlayerUserHistory } = require("../models");
const wait = {};
const data = {};
let p1;
let hasil;

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
    return p2 === "scissors" ? "player 1 Win" : "player 1 Lose";
  }
  if (p1 === "paper") {
    return p2 === "rock" ? "player 1 Win" : "player 1 Lose";
  }
  if (p1 === "scissors") {
    return p2 === "paper" ? "player 1 Win" : "player 1 Lose";
  }
};

const win = (score1, score2) => {
  let winResult = {};
  if (score1 === score2) {
    winResult = { player1: "draw", player2: "draw" };
  } else if (score1 > score2) {
    winResult = { player1: "Win", player2: "Lose" };
  } else if (score1 < score2) {
    winResult = { player1: "Lose", player2: "Win" };
  }
  return winResult;
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
    let player1Score = 0;
    let player2Score = 0;

    const roomExist = await PlayGame.findAll({ where: { roomId: id } });

    const finalScore = roomExist.map((score) => {
      if (score.result === "player 1 Win") {
        player1Score += 1;
      } else if (score.result === "player 1 Lose") {
        player2Score += 1;
      }
    });

    if (roomExist.length >= 3 && roomExist[roomExist.length - 1].p2Choose !== null) {
      let result = win(player1Score, player2Score);
      const historyExist = await PlayerUserHistory.findOne({
        where: { roomId: id },
      });
      if (!historyExist) {
        await PlayerUserHistory.create({
          roomId: id,
          resultGame: `Player 1 : ${result.player1}, Player 2 : ${result.player2}`,
        });
      }
      return res.json({ roomExist, player1Score, player2Score, result });
    }

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
      hasil = resultCondition(p1, req.body.p2Choose);
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
    res.json(hasil);
    res.json(data[id]);
  },
};
