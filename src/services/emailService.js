const nodemailer = require('nodemailer');
const CustomError = require('../models/customError.js');
const dotenv = require('dotenv');

dotenv.config();


class EmailService {
    constructor() {
        if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
            throw new CustomError(500,'Email credentials not found in environment variables');
        }
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        });

    }

    async sendMail(email, subject, text) {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            html: text
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            throw new CustomError(500, 'Error sending email');
        }
    }
}

module.exports = { EmailService };