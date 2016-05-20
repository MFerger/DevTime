var express = require('express');
var router = express.Router();
var knex = require('../db/');

/* GET home page. */
router.post('/receive', function(req, res, next) {
  console.log("hit endpoint");
  console.log(req.body.body);
  res.json(req.body);
});

router.get('/', function(req, res, next){

  knex('conversations')
    .select('messages.id as msg_id', 'messages.message', 'conversations.id' )
    .where({user_id: req.user.id})
    .innerJoin('messages', 'conversations.id', 'messages.conversation_id')
    .then(function(conversations){
      var results = {}
      conversations.forEach(function(conversation){
        var message = {id: conversation.msg_id, message: conversation.message};
        obj[conversation.id] ?
          obj[conversation.id].messages.push(message) :
          obj[conversation.id].messages = [message];
      });

      res.json(results);
    })

})

router.post('/', function(req, res, next){
  var message = req.body.message;
  var conversationId = req.body.conversationId;
  var user = req.user;
  var errors = []

  if (!message) errors.push("You need to enter a message.");
  if (!conversationId) errors.push("What's the conversation?");
  if (errors.length > 0) return req.status(400).send({errors: errors});


  // kenx('conversations').where({user_id: user.id, id: conversationId}).then({
  //
  //
  // })

  knex('messages').insert({message: message, conversation_id: conversationId}).then(function(){

    var twilio = require('twilio')(req.user.twilioID, req.user.token);
    console.log('sending message');
    twilio.sendMessage({
      to:'+13037090688', // Any number Twilio can deliver to
      from: req.user.phone, // A number you bought from Twilio and can use for outbound communication
      body: 'word to your mother.' // body of the SMS message
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (err) {
        console.log(err);
      }else{
        res.json('sent message');
        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."
      }

    });
  })
})

module.exports = router;
