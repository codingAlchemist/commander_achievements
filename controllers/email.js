const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'jason.debottis@gmail.com',
        pass: 'mlkvzfimwkzyxsyo'
    }
})

const sendMail = (req, res) => {
    const mailOptions = {
        from: 'jason.debottis@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: `<p>Email:${req.body.email}</p>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send({ error: `Something failed! ${err.message}` });
        } else {
            res.status(200).send({ success: `Email sent: ${info.response}` });
        }
    });
}


module.exports = {
    sendMail
}