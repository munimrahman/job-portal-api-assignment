const nodemailer = require("nodemailer");
const { google } = require("googleapis");

module.exports.sendMailWithGmail = async (data) => {
  console.log("Working 1");
  // create client
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  // set credentials
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = await oAuth2Client.getAccessToken();
  // console.log(t);
  // get access token
  // const accessToken = await new Promise((resolve, reject) => {
  //   oAuth2Client.getAccessToken((err, token) => {
  //     if (err) {
  //       reject("Failed to create access token :(");
  //     }
  //     resolve(token);
  //   });
  // });
  console.log("Working 2");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_MAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: process.env.SENDER_MAIL,
    to: data.email,
    subject: data.subject,
    text: data.text,
  };
  // console.log(mailData);
  let info = await transporter.sendMail(mailData);
  // console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info.messageId;
};
