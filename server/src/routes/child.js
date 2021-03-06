const express = require("express");
const router = express.Router();
const resStatus = require("../constants/responseStatus");

const child = require("../controllers/childController");

router.post("/add", async (req, res) => {
    const obj = { ...req.body };
    try {
        const data = await child.addChild(obj);
        console.log(data)
        if (!data) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to add the details" });
        }
        return res
            .status(resStatus.SUCCESS_CREATED)
            .send(data);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ message: error.message });
        }
        return res.status(resStatus.INTERNAL_SERVER_ERROR).send(error.message);

    }
})

router.post("/get", async (req, res) => {
    const orgid = req.body;
    console.log(orgid);
    try {
        const data = await child.getChild(orgid);
        if (!data) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to get the details" });
        }
        return res
            .status(resStatus.SUCCESS_OK)
            .send({ data: data });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ message: error.message });
        }
        return res.status(resStatus.INTERNAL_SERVER_ERROR).send(error.message);

    }
})

module.exports = router;