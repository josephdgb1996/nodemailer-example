const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();

app.use(cors())
app.use(express.json());

const nodemailer = require("nodemailer");

async function send_email(req, res, next) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        res.status(200).send({ ok: true, info: info });
    } catch (error) {
        res.status(500).send({ ok: false, error: error });

    }
};

app.get('/', send_email);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})