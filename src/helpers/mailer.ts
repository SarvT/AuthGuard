import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyTokenExpiry: Date.now() + 3600000, verifyToken: hashedToken
            })
        } else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordTokenExpiry: Date.now() + 3600000, forgotPasswordToken: hashedToken
            })

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: process.env.USER_CS,
                  pass: process.env.PASS_CS
                }
              });
            const mailOptions = {
                from: 'otis@gmail.com', // sender address
                to: email, // list of receivers
                subject: emailType === 'VERIFY' ? "Verify your email" : `Reset Password` , // Subject line
                html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>` 
            }
            
            // html:`<p>Hi,</p><br/><a href="${process.env.domain}/#/reset-password/${hashedToken}">Click here</a>`//html body
            const mailResponse = await transport.sendMail(mailOptions);
            return mailResponse;
            // console.log();
            
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}