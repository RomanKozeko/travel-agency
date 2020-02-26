import nodeMailer from 'nodemailer';
import config from '../../config/index';

const htmlTemplate = ({ message, name, phone, email, item }) => `
    ${message ? `<p>${message}</p>` : ''}
    <p><b>Имя:</b> ${name}</p>
    ${phone ? `<p><b>Телефон:</b> ${phone}</p>` : ''}
    <p><b>Email:</b> ${email}</p>
    ${item ? `<b>Заказ: <a href=${item.url}>${item.title}</a></b>` : ''}
`;

module.exports = {
  post(req, res, next) {
    const props = req.body;
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email.from,
        pass: config.email.password,
      },
    });
    const mailOptions = {
      from: `Bssr.by`,
      to: config.email.to,
      subject: props.emailSubject || 'Заказ Вssr.by',
      html: htmlTemplate(props),
    };

    transporter.sendMail(mailOptions, error => {
      if (error) next();
      res.sendStatus(200);
    });
  },
};
