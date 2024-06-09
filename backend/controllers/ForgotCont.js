import { User } from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const verification = {};

export const sendEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const randomCode = crypto.randomBytes(3).toString('hex').toUpperCase();
            verification[email] = randomCode;
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'factsintresting528@gmail.com',
                    pass: "vpnl xcyh cuzy bsky"
                }
            });

            const mailOptions = {
                from: "factsintresting528@gmail.com",
                to: user.email, 
                subject: "Password Reset Request",
                text: `Hello Your Password Reset Code is ${randomCode}`,
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ success: false, message: "Failed to send email" });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ success: true, message: "Email sent successfully" });
                }
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const verifyCode = (req, res) => {
    const { email, code } = req.body;
    const storedCode = verification[email];

    if (storedCode && storedCode === code) {
        res.status(200).json({ success: true, message: "Verification successful" });
        delete verification[email];
    } else {
        res.status(400).json({ success: false, message: "Invalid verification code" });
    }
};
