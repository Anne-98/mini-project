const Vonage = require('@vonage/server-sdk')
const express = require('express')
const otpGenerator = require('otp-generator')
const { updatePasswordCakeMaker, updatePasswordCustomer } = require('../database/smsDB')


const vonage = new Vonage({
  apiKey: "be4809ca",
  apiSecret: "yVaiOTElwC5RtgH2"
})

const smsRoute  = express.Router()

var RealOtp;

smsRoute.post('/send_sms', (req, res) => {
  
  RealOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  
    console.log("1")
    const from = "Vonage APIs"
    const to = "94764645663"
    const text = `OTP:${RealOtp}`

    console.log("RealOtp:", RealOtp)
    
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        console.log("2")
        if (err) {
            console.log("3")
            res.json({result: "error", err})
        } else {
            console.log("4")
            if(responseData.messages[0]['status'] === "0") {
                console.log("5")
                res.json({msg: "Please check the OTP number sent to *******932.", RealOtp, success:true})
            } else {
                console.log("6")
                // res.json({msg:`Message failed with error: ${responseData.messages[0]['error-text']}`})
                res.json({msg:`Message failed`, success:false})
            }
        }
    })
})

smsRoute.post('/password_reset_cakemaker', async(req, res) =>{
    
    var otp = req.body.otp
    var email = req.body.email
    var password = req.body.password

    if (otp == RealOtp) {
        RealOtp = 'empty'
        var data = await updatePasswordCakeMaker(email, password)
        if (data.length > 0) {
          req.session.isLog = true
          req.session.user_id = data[0].cake_makers_id
          res.json({msg:"success", success:true, data, isLog:true})
        }
        req.session.isLog = false
        req.session.user_id = null
        res.json({msg:"Something went wrong", success:false, isLog:false})
      }else{
        req.session.isLog = false
        req.session.user_id = null
        RealOtp = 'empty'
        res.json({msg:"OTP doesn't match.", success:false, isLog:false})
    }
})

smsRoute.post('/password_reset_customer', async(req, res) =>{
    
    var otp = req.body.otp
    var email = req.body.email
    var password = req.body.password

    if (otp == RealOtp) {
        RealOtp = 'empty'
        var data = await updatePasswordCustomer(email, password)
        if (data.length > 0) {
          req.session.isLog = true
          req.session.user_id = data[0].cus_id
          res.json({msg:"success", success:true, data, isLog:true})
        }
        req.session.isLog = false
        req.session.user_id = null
        res.json({msg:"Something went wrong", success:false, isLog:false})
      }else{
        req.session.isLog = false
        req.session.user_id = null
        RealOtp = 'empty'
        res.json({msg:"OTP doesn't match.", success:false, isLog:false})
    }
})

module.exports = smsRoute

// const express = require('express')
// var nodemailer = require('nodemailer');

// const smsRoute  = express.Router()

// smsRoute.post('/send_sms', async(req, res) => {

//    var transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // upgrade later with STARTTLS
//       service: 'gmail',
//       auth: {
//         user: 'cakemount.customercare@gmail.com',
//         pass: 'cakemount@1234#',
//       },
//       tls:{
//         rejectUnauthorized:false
//       }
//     });

//   let mailOptions = {
//       from: 'cakemount.customercare@gmail.com',
//       to: 'mshamalka2@gmail.com , elish.fernando@gmail.com',
//       subject: 'The Cake Mount Customer Care',
//       text: `Hi, 
//       Please confirm your account ownership`
//     };

//      transporter.sendMail(mailOptions, function(err, data) {
//       if (err) {
//         console.log("Error " + err);
//       } else {
//         console.log("Email sent successfully" + data.response);
//       }
//     });
// })

// module.exports = smsRoute