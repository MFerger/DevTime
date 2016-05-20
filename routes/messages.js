var express = require('express');
var router = express.Router();
var twilio = require('twilio')(req.user.twilioID, req.user.token);

/* GET home page. */
router.post('/receive', function(req, res, next) {
  console.log("hit endpoint");
  console.log(req.body.body);
  res.json(req.body);
});

router.get('/send', function(req, res, next){
  var user = req.user;
  twilio.sendMessage({

    to:'+3037090688', // Any number Twilio can deliver to
    from: '+17208973791', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (err) {
      console.log(err);
    }else{
      // "err" is an error received during the request, if any
          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1
          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."
    }
  });

})

module.exports = router;
