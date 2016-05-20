(function() {
  'use strict';
  angular.module('devtime')
    .factory('questionsService', factory)

  factory.$inject = [
    '$log',
    '$http'
  ]

  function factory($log, $http) {
    let _currentUser = {};
    return {
      questions: questions,
      signup: signup,
      login: login,
      message: message
    }

    function signup(postData) {
      return _currentUser = postData;
    }

    function questions(questions) {
      _currentUser.q1 = questions.a;
      _currentUser.q2 = questions.b;
      _currentUser.q3 = questions.c;
      _currentUser.q4 = questions.d;
      _currentUser.time = questions.time;
      return $http.post('/api/v1/users/signup', _currentUser)
        .then(function(res) {
          console.log('it cam back from the server', res);
        })
    }

    function login(user) {
      return $http.post('/api/v1/users/login', user)
        .then(function(res) {
          console.log(res);
        })
    }
    function message (msg) {
      
    }

  }
}());
