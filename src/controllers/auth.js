const express = require("express");
const { Account } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/sign-in", (req, res) => {
    return res.json("sign-in!");
});

router.get("/sign-up", async (req, res) => {
    
    const saltRonds = 10;

    const email = "erickd.moraes@gmail.com";
    const password = "123456";

    const hash = bcrypt.hashSync(password, saltRonds);
    const result = await Account.create({email, password: hash});
    
    return res.json(result);
});

module.exports = router;