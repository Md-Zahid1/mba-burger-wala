import nodemailer from "nodemailer"
import adminEmailTamplate from "./adminEmailTamplate.js"

export const sandEmailToAdmin = async (type, vender, detail = {}) => {
    try {
        const emailTamplate = { ...adminEmailTamplate[type] }
 
        if (emailTamplate.html.includes("{{OTP}}")) {
            emailTamplate.html = emailTamplate.html.replace("{{OTP}}", detail.otp)
        }
 


        if (emailTamplate.html.includes("{{businessName}}")) {
            emailTamplate.html = emailTamplate.html.replace("{{businessName}}", vender.businessName)
        }
        console.log("emailTamplateAdmin", emailTamplate)

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GOOGLE_SMTP_EMAIL,
                pass: process.env.GOOGLE_SMTP_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_SMTP_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: emailTamplate.subject,
            text: "Hello world?",
            html: emailTamplate.html,
        });

        console.log("Message sent: %s", info.messageId);
        return detail
    } catch (err) {
        console.log("error", err)
        return null
    }
}
