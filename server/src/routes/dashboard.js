const epxress = require("express");
const router = epxress.Router();
const resStatus = require("../constants/responseStatus");

const dashboard = require("../controllers/dashboardController");

router.post("/get", async (req, res) => {
    const orgid = req.body.orgid;
    console.log(orgid)

    try {
        const data = await dashboard.getInfo(orgid);
        console.log(data)
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