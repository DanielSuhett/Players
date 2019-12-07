const router = require("express").Router();
const controller = require("../controllers/players.controller");

router.post("/create-player", controller.createPlayer);

router.get("/", controller.listPlayers);

router.get("/:id", controller.findPlayer); 

router.delete("/:id", controller.deletePlayer); 

// Games

router.get("/:game", controller.listGamePlayers); 

router.delete("/:id/games/:game", controller.deleteGame);

module.exports = (app, verifyJWT) => app.use("/players", verifyJWT, router);
