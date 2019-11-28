const express = require("express");
const router = express.Router();
const controller = require("../controllers/server.controller");

router.post("/create", controller.create);

//Persons

router.get("/", controller.listAll);

router.get("/:id", controller.findPerson);

router.put("/:id", controller.editPerson);

router.delete("/:id", controller.deletePerson);

// Games

router.get("/games/:games", controller.listGamePlayers);

router.delete("/:id/games/:games", controller.deleteGame);

module.exports = app => app.use("/persons", router);
