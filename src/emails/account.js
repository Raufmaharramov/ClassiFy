const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API);
const welcomeEmail = (email, name) => {
  sgMail.send({ to: email, from: "gedoppcompany@gmail.com", subject: "Test email", text: `Dear ${name}. Congratulations on your signing up to our TaskApp. TaskApp offers various services for it's client with 100% security guidlines. We hope you an enjoyable TaskApp journey and we are very happy to see you among side of us!` });
};

const goodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gedoppcompany@gmail.com",
    subject: "We are sorry to see you go!",
    text: `Dear ${name}, as a TaskApp team we are sorry to see you go. Your absence is worrying us, please let us know what could we do to keep us among us!`
  });
};

module.exports = {
  welcomeEmail,
  goodbyeEmail
};
