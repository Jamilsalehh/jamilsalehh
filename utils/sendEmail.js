const nodemailer = require('nodemailer');
const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    // Creating the email transporter
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // Options for sending the email
    const options = {
        from: sent_from,
        to: send_to,
        subject: subject,
        html: message,
        replyTo: reply_to
    };
    try {
        // Actually sending the email
        const info = await transporter.sendMail(options);
        console.log("Email sent successfully:", info.response);
        return "Email sent successfully.";
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Error sending email.");
    }
};

module.exports = sendEmail;