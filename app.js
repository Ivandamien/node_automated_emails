const express = require('express');
const dotenv = require('dotenv')
const app = express();
const nodemailer = require('nodemailer');
app.use(express.json())


dotenv.config({ path: './config.env' })


app.post('/sendEmail', (req, res, next) => {

    const output = `
    <p>Welcome to nodemailer contact</p>
    <p>You are here to test our automated email if its working</p>
    <p>If you recieve this email that means the algorithm has been implemented successfully</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name : ${req.body.name}</li>
        <li>Email : ${req.body.email}</li>
       
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    try {


        let sub = `Welcome ${req.body.name}`;
        let message = `Your email has been added to our database. You will be recieving promotional messages and offers `
        let transporter = nodemailer.createTransport({
                host: process.env.GMAIL_HOST,
                port: process.env.GMAIL_PORT * 1,
                secure: false,
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                },

            })
            // 2)Define the email options
        let mailOptions = {
                from: 'Developer Ivan <vdick988@gmail.com>',
                to: req.body.email,
                subject: sub,
                text: message,
                html: output

            }
            // 3)Actually send the email
        transporter.sendMail(mailOptions);
        console.log(mailOptions)
        res.status(200).json({
            status: 'success',
            message: "Email has been sent succesfully"
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        })

    }

})



const port = process.env.PORT;
app.listen(port, () => (console.log(`Server is running at port ${port}`)))