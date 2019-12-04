const express = require("express");
const router = express.Router();
const controller = require("../controllers/players.controller");

router.post("/create-player", controller.createPlayer);

router.get("/", controller.listPlayers); //list all players of user

router.get("/:id", controller.findPlayer); //list especific player of user

router.delete("/:id", controller.deletePlayer); // delete player

// Games

router.get("/:game", controller.listGamePlayers); //list players of game

router.delete("/:id/games/:game", controller.deleteGame); // delete game of

module.exports = (app, verifyJWT) => app.use("/players", verifyJWT, router);
