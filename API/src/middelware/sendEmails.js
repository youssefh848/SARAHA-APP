import nodemailer from "nodemailer";


export const sendEmails = async ({
  to,
  subject,
  text,
  html,
}) =>{
    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
          user: "youssefhossam205@gmail.com",
          pass: "gmltaofskjxtttve",
        },
        tls: {
            rejectUnauthorized: false,
          },
      });



      const info = await transporter.sendMail({
        from: '"SARAHA APP ✨" <youssefhossam205@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
} 