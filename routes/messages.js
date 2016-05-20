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
  req.user.id = 1;
  knex('conversations')
    .select('messages.id as msg_id', 'messages.message', 'conversations.id as conv_id', 'conversations.user_id')
    .where({'conversations.user_id': req.user.id})
    .leftJoin('messages', 'messages.conversation_id', 'conversations.id')
    .then(function(conversations){
      var results = {}
      console.log(conversations);
      conversations.forEach(function(conversation){
        var message = {id: conversation.msg_id, message: conversation.message};
        delete conversation.message

        if(!message.message) return conversation.messages = [];

        if(results[conversation.id]){
          results[conversation.id].messages.push(message);
        }else{
          results[conversation.id] = conversation;
          conversation.messages = [conversation.message];
        }

      });

      res.json(conversations);
    }).catch(function(err){
      console.log(err);
      res.status(500).send({});
    })

})

router.post('/', function(req, res, next){
  var phone = req.body.phone
  var time = req.body.time;
  var unit = req.body.unit;
  // var message = req.body.message;
  // var conversationId = req.body.conversationId;
  // var user = req.user;
  var errors = []

  if (!phone) errors.push("You need to enter a phone number.");
  if (!time) errors.push("Please enter a time estimate.");
  if (!unit) errors.push("Please enter a unit of time.");
  if (errors.length > 0) return req.status(400).send({errors: errors});


  kenx('conversations').where({user_id: user.id, receiver_num: phone}).first().then(function(conversation){

    if (conversation) return conversation;

    return knex('conversations').insert({user_id: req.user.id, receiver_num: phone}).returning("*");

  }).then(function(conversation){

    knex('messages').insert({message: message, conversation_id: conversation.id}).returning('*')

  }).then(function(message){

    var twilio = require('twilio')(req.user.twilioID, req.user.token);
    console.log('sending message');
    twilio.sendMessage({
      to:'phone', // Any number Twilio can deliver to
      from: req.user.phone, // A number you bought from Twilio and can use for outbound communication
      body: 'word to your mother.' // body of the SMS message
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (err) {
        console.log(err);
        knex('messages').where('id', message.id).then(function(){
          res.status(500).send({message: "Could not send message :(. Try again later..."});
        })
      }else{
        res.json({message: 'Message successfully sent to ' + phone});
        console.log(responseData.from);
        console.log(responseData.body);
      }
    });

  })
})

module.exports = router;
