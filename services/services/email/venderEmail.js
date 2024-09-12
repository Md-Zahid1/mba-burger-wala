import nodemailer from "nodemailer"
import venderEmailTamplate from "./venderEmailTamplate.js"

export const sendEmailToVender = async (type, vender, detail = {}) => {
    const emailTamplate = { ...venderEmailTamplate[type] }

    if (emailTamplate.html.includes("{{OTP}}")) {
        emailTamplate.html = emailTamplate.html.replace("{{OTP}}", detail.otp)
    }
    if (emailTamplate.html.includes("{{businessName}}")) {
        console.log("vender", vender)
        emailTamplate.html = emailTamplate.html.replace("{{businessName}}", vender.businessName)
    }

    if (emailTamplate.html.includes("{{businessName}}")) {
        emailTamplate.html = emailTamplate.html.replace("{{businessName}}", vender.businessName)
    }

    if (detail.enquiry) {
        console.log("detail.enquiry", detail.enquiry)
        emailTamplate.html = emailTamplate.html.replace("{{name}}", detail.enquiry.name)
            .replace("{{email}}", detail.enquiry.email)
            .replace("{{mobile}}", detail.enquiry.mobile)
            .replace("{{event}}", detail.enquiry.event)
            .replace("{{location}}", detail.enquiry.location)
            .replace("{{date}}", detail.enquiry.date)
            .replace("{{service}}", detail.enquiry.service)
            .replace("{{budget}}", detail.enquiry.budget)
            .replace("{{message}}", detail.enquiry.message)
    }

    console.log("detail.user", detail.user)
    if (detail.user) {
        emailTamplate.html = emailTamplate.html.replace("{{name}}", detail.user.name)
            .replace("{{email}}", detail.user.email)
    }


    if (vender) {
        emailTamplate.html = emailTamplate.html.replace("{{businessName}}", vender.businessName)
    }

    console.log("emailTamplate", emailTamplate)



    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GOOGLE_SMTP_EMAIL,
            pass: process.env.GOOGLE_SMTP_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: process.env.GOOGLE_SMTP_EMAIL,
        to: vender.email,
        subject: emailTamplate.subject,
        text: "Hello world?",
        html: emailTamplate.html,
    });

    console.log("Message sent: %s", info.messageId);
    return detail
}
