const { Router } = require("express");
const express = require("express");
const { adminMiddleware } = require("../middleware/adminAuth")
const jwt = require("jsonwebtoken");
require('dotenv').config();
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel, courseModel } = require("../db");
const path = require("path");

adminRouter.use(express.static(path.join(__dirname, '../frontend')));

adminRouter.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signUpAdmin.html'));
})

adminRouter.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signin.html'));
})

adminRouter.post('/signup', async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string()
            .min(8, "Password must be at least 8 characters.")
            .max(50, "Password length cannot exceed 50 characters.")
            .regex(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=+\/`~]).*$/,
                "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character."
            ),
        firstName: z.string().min(2, "First name must be at least 2 characters.").max(50, "First name cannot exceed 50 characters."),
        lastName: z.string().min(2, "Last name must be at least 2 characters.").max(50, "Last name cannot exceed 50 characters.")
    });

    const parsedData = requiredBody.safeParse(req.body);
    if (parsedData.success) {
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({ msg: "you have signed up" });
        return
    } else {
        res.json({
            msg: parsedData.error,
        })
    }
})

adminRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const admin = await adminModel.findOne({
        email: email,
    })
    if (admin) {
        const comparePassword = bcrypt.compare(password, admin.password);
        if (comparePassword) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET);
            res.json({
                msg: 'you have logged in',
                token: token
            })
            return
        } else {
            res.json({
                msg: "wrong password"
            })
            return
        }
    } else {
        res.json({
            msg: "You haven't signed up",
        })
    }
})

adminRouter.delete('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title } = req.body;
    const courses = await courseModel.find({
        adminId
    })
    if (courses.length != 0) {
        console.log('hi');
        await courseModel.deleteOne({
            title
        })
        res.json({
            msg: "deleted"
        })
    }
})

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const requiredBody = z.object({
        title: z.string(),
        category: z.string(),
        description: z.string(),
    })
    const parsedData = requiredBody.safeParse(req.body);
    if (parsedData.success) {
        const adminId = req.userId;
        const { title, description, imageURL, category } = req.body;
        try {
            const course = await courseModel.create({
                title,
                category,
                description,
                imageURL,
                adminId
            })
            res.json({
                msg: 'Your course has been successfully added',
                courseId: course._id
            })
        } catch (error) {
            res.json({
                msg: `error is ${error}`,
            })
        }
    } else {
        res.json({
            msg: "you made a error"
        })
    }
})

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageURL, courseId } = req.body;
    await courseModel.updateOne({
        _id: courseId,
        adminId
    }, {
        title,
        description,
        imageURL
    })
    res.json({
        msg: "Title has been changed"
    })
})

adminRouter.get('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.find({
        adminId
    })
    if (courseModel.length != 0) {
        res.json({
            courses
        })
    } else {
        res.json({
            msg: "you have not added any course yet"
        })
    }
})

module.exports = ({
    adminRouter
})