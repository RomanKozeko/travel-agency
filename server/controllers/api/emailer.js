import nodeMailer from 'nodemailer';
import config from '../../config/index';

const htmlTemplate = ({ message, name, phone, email, tour }) => (`
    <p>${message ? message : ''}</p>
    <p><b>Имя:</b> ${name}</p>
    <p><b>Телефон:</b> ${phone ? phone : 'не указан'}</p>
    <p><b>Email:</b> ${email}</p>
    <b>Тур: <a href=${tour.url}>${tour.title}</a></b>
`);

module.exports = {
  post(req, res, next) {
    const props = req.body;
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email.from,
        pass: config.email.password
      }
    });
    const mailOptions = {
      from: `tour agency 👻 <${config.email.from}>`,
      to: config.email.to,
      subject: 'Заказ тура',
      html:  htmlTemplate(props)
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
