const express = require("express");
const { Account } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

const saltRonds = 10;

router.get("/sign-in", (req, res) => {
    return res.json("sign-in!");
});

router.get("/sign-up", async (req, res) => {
    const { email, password } = req.body;

    const account = await Account.findOne({ where: { email } });
    if (account) return res.json("Account already exists");

    const hash = bcrypt.hashSync(password, saltRonds);
    const newAccount = await Account.create({email, password: hash});
    
    return res.jsonOK(newAccount, "Account created");
});

module.exports = router;