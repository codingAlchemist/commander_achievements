const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jason.debottis@gmail.com',
        pass: 'xjdgyjxgxszhlrwt'
    }
})

const sendMail = (req, res) => {
    const mailOptions = {
        from: 'jason.debottis@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }

    transporter.sendMail(mailOptions, function(error, info){
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