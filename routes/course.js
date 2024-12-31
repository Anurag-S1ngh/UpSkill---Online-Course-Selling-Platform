const { Router } = require("express");
const { userMiddleware } = require("../middleware/userAuth");
const user = require("./user");
const { courseModel, purchaseModel } = require("../db");
const courseRouter = Router();

courseRouter.get("/preview", async (req, res) => {
    const userId = req.userId;
    const courses = await courseModel.find();
    console.log(courses)
    res.json({
        msg: "course preview endpoint",
        courses
    })
})

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { courseId } = req.body;
    const course = await purchaseModel.findOne({
        courseId,
    })
    if (!course) {

        await purchaseModel.create({
            userId,
            courseId
        })
        res.json({
            msg: "purchase has been made"
        })

    } else {
        res.json({
            msg: "you have already purchased this course"
        })
    }
})

module.exports = ({
    courseRouter
})