var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'techguyinfo@gmail.com',
            pass: 'something'
        }
    });
    
    var mailOptions = {
        from : 'John Doe <johndoe@outlook.com>',
        to : 'techguyinfo@gmail.com',
        subject : 'Website Submission',
        text: 'You have new Submission with following details... Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
        html: '<p>You have new Submission with following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: </li>'+req.body.message+'</ul>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.redirect('/');
        }else{
            console.log('Message Sent: '+info.response);
            res.redirect('/');
        }
    });
    
});

module.exports = router;