import nodeMailer from 'nodemailer';
import config from '../../config/index';

module.exports = {
  post(req, res, next) {
    const props = req.body;

    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });
    let mailOptions = {
      from: '"tour agency 👻" <config.email.user>',
      to: props.email,
      subject: 'Заказ тура',
      text: props.message,
      html: `<b>tour url: ${props.tour}</b>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        next();
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.sendStatus(200);
    });
  }
};