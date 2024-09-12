import nodemailer from "nodemailer"
import crypto from "crypto"


export const otpEmail = async (email) => {
    try { 
        const otp = crypto.randomInt(100000, 999999);
        console.log('otp', otp)
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GOOGLE_SMTP_EMAIL,
                pass: process.env.GOOGLE_SMTP_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_SMTP_EMAIL,
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<body style="font-family: Arial, sans-serif; border: solid 2px;">
    
            <p>Hello <strong>[Business Name]</strong>,</p>
          
            <p>Thanks for choosing Shootwala. Your Verification Code for registration is <strong>${otp}</strong>.</p>
          
            <p>Verification Code is valid for 30 Minutes.</p>
          
            <p>Best Regards,<br>Team Shootwala</p>
          
          </body>`,
        });

        console.log("Message sent: %s", info.messageId);
        return { otp, info }
    } catch (err) {
        console.log("error", err) 
        return null
    }
}




