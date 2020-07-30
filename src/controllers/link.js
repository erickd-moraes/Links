const express = require("express");
const { Link } = require("../models");

const router = express.Router();

// get all links
router.get("/", async (req, res) => {
    const accountId = 1; // req.id
    const link = await Link.findAll({ where: { accountId } });

    return res.jsonOK(link);
});

// get single link
router.get("/:id", async (req, res) => {
    const accountId = 1; // req.id
    const { id } = req.params;

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    return res.jsonOK(link);
});

// create a link
router.post("/", async (req, res) => {
    const accountId = 1; // req.id
    const { label, url, isSocial } = req.body;

    const image = "https://google.com/image.jpg"

    const link = await Link.create({ label, url, isSocial, image, accountId });

    return res.jsonOK(link);
});

// update a link
router.put("/:id", async (req, res) => {
    const accountId = 1; // req.id
    const { id } = req.params;
    const { body } = req;
    const fields = ["label", "url", "isSocial"];

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    fields.map((fieldName) => {
        const newValue = body[fieldName];
        if (newValue) link[fieldName] = newValue;
    });

    await link.save();

    return res.jsonOK(link);
});

// delete a link
router.delete("/:id", async (req, res) => {
    const accountId = 1; // req.id
    const { id } = req.params;

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    await link.destroy();

    return res.jsonOK(link);
});

module.exports = router;