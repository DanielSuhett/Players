const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/login", controller.login);

module.exports = app => app.use("/auth", router);