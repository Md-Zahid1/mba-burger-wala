import nodemailer from "nodemailer"
import userEmailTamplate from "./userEmailTamplate.js"

export const sendEmailToUser = async (type, user, detail) => {
    try {
        const emailTamplate = { ...userEmailTamplate[type] }

        if (emailTamplate.html.includes("{{OTP}}")) {
            emailTamplate.html = emailTamplate.html.replace("{{OTP}}", detail.otp)
        }


        if (emailTamplate.html.includes("{{name}}")) {
            emailTamplate.html = emailTamplate.html.replace("{{name}}", user.name)
        }

        if (emailTamplate.html.includes("{{reply}}")) {
            emailTamplate.html = emailTamplate.html.replace("{{reply}}", user.reply)
        }

        if (detail?.venders) {

            const liTamplate = `<li>
                <p><img src="{{businessBanner}}" alt="businessBanner"/> {{businessName}}, {{ratting}}</p>
                <p>Locations - </p>
                <p>{{minPrice}} - INR</p>
              </li > `

            const venderList = detail.venders.docs.reduce((acc, ven) => {


                return acc += liTamplate.replace('{{businessBanner}}', ven.businessBanner)
                    .replace("{{businessName}}", ven.businessName)
                    .replace("{{ratting}}", ven?.rating?.rate ?? 0)
                    .replace("{{minPrice}}", ven.minPrice)

            }, "")

            emailTamplate.html = emailTamplate.html.replace("{{venders}}", venderList)
            // emailTamplate.html = emailTamplate.html.replace("{{name}}", detail.enquiry.name)
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
            to: user.email,
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
