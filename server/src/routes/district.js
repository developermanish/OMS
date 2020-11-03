const epxress = require("express");
const router = epxress.Router();
const resStatus = require("../constants/responseStatus");

const district = require("../controllers/districtControlller");

router.post("/add", async (req, res) => {
    const obj = { ...req.body };
    console.log(obj);
    try {
        const data = await district.addDistrict(obj);
        console.log(data)
        if (!data) {
            return res
                .status(resStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "Unable to add the District" });
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
        const data = await district.getDistrict(orgid);
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
router.post("/getByStateId", async (req, res) => {
    const { orgid, stateid } = req.body;
    console.log(orgid);
    try {
        const data = await district.getDistrictByStateId(orgid, stateid);
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