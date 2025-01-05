const { Router } = require("express");
const express = require('express');
const { userMiddleware } = require("../middleware/userAuth");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const userRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { userModel, purchaseModel, courseModel } = require("../db");
const path = require("path");

userRouter.use(express.static(path.join(__dirname, '../frontend')));

userRouter.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signin.html'));
})


userRouter.get('/signup', (req, res) => {
    const filePath = path.join(__dirname, "../frontend/signUpUser.html");
    res.sendFile(filePath);
})

userRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string()
            .min(8, "Password must be at least 8 characters.")
            .max(30, "Password length cannot exceed 30 characters.")
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-`~=+]).*$/, "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character."),
        username: z.string().min(2).max(30),
    });

    const parsedData = requiredBody.safeParse(req.body);
    if (parsedData.success) {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await userModel.create({
                email: email,
                password: hashedPassword,
                username,
            })
        } catch (e) {
            res.json({ error: "database not created " + e });
            return;
        }
        res.json({
            msg: "done"
        })
        return
    } else {
        res.json({
            msg: "some error occurred" + parsedData.error
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({
        email: email,
    })
    if (user) {
        const comparePassword = await bcrypt.compare(password, user.password)
        if (comparePassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET);
            res.json({
                msg: token
            })
            return
        }
    } else {
        res.json({
            msg: "You haven't Sign up",
        })
    }
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courses = await purchaseModel.find({
        userId
    })
    if (courses.length != 0) {
        const userCourses = await courseModel.find({
            _id: { $in: courses.map((e) => e.courseId) }
        })
        res.json({
            userCourses: userCourses
        })
    } else {
        res.json({
            msg: "you haven't bought a course"
        })
    }
})

module.exports = ({
    userRouter
})