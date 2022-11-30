var nodemailer = require("nodemailer");
const config = require("../config");
const configvalue = config.get(process.env.Node_env);
const email = configvalue["EMAIL"]
 console.log(email);

export const SendEmail = (from, to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.username,
      pass: email.password,
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
      return 
      
    } else {
      console.log("Email sent: " + info.response);

      return false;
    }
  });
};