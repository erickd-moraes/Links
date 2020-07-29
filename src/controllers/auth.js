const express = require("express");
const { Account } = require("../models");
const { accountSignUp } = require("../validators/account");
const { getMessage } = require("../helpers/messages");
const bcrypt = require("bcrypt");
const router = express.Router();

const saltRonds = 10;

router.get("/sign-in", (req, res) => {
    return res.jsonOK(null);
});

router.get("/sign-up", accountSignUp, async (req, res) => {
    const { email, password } = req.body;

    const account = await Account.findOne({ where: { email } });
    if (account) return res.jsonBadRequest(null, getMessage("account.signup.email_exists"));

    const hash = bcrypt.hashSync(password, saltRonds);
    const newAccount = await Account.create({email, password: hash});
    
    return res.jsonOK(newAccount, getMessage("account.signup.success"));
});

module.exports = router;