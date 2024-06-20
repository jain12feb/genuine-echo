import EmailVerificationCode from "@/emails/EmailVerificationCode";
import sendEmail from "@/lib/sendEmail";
import { render } from "@react-email/render";

// const verificationCodeTemplate = (code) => `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Email Verification</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//         }

//         .container {
//             text-align: center;
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//         }

//         h1 {
//             text-align: center;
//             color: #333;
//         }

//         .code {
//             font-size: 24px;
//             font-weight: bold;
//             text-align: center;
//             margin: 20px 0;
//             color: #007bff;
//         }
//     </style>
// </head>

// <body>
//     <div class="container">
//         <h1>Email Verification Code</h1>
//         <p>Your 6 digits verification code:</p>
//         <div class="code">${code}</div>
//         <p>Please use this code to verify your email address.</p>
//     </div>
// </body>

// </html>
// `;

const sendVerificationEmail = async (email, code) => {
  try {
    const emailHtml = render(<EmailVerificationCode validationCode={code} />);

    const emailResponse = await sendEmail(email, {
      subject: "Email verification Code - Genuine Echo",
      html: emailHtml,
    });

    if (emailResponse) {
      return {
        success: true,
        message: "Verification email sent successfully",
      };
    }

    return {
      success: false,
      message: "Error in sending verification email",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export default sendVerificationEmail;
