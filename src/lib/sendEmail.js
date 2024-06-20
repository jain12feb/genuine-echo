import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmail = async (to, message) => {
  try {
    const data = await transporter.sendMail({
      from: `Genuine Echo <${process.env.NODEMAILER_EMAIL}>`,
      to,
      subject: message?.subject,
      html: message?.html,
    });

    // console.log("send mail data", data);

    return data.response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default sendEmail;
