(function() {
  'use strict';

  var dependencies = [
    'ui.router'
  ];

  angular.module('devtime', dependencies)
  .config(setupStates)

  setupStates.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider'
  ];

  function setupStates($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
     .state('devtime', {
       templateUrl: '/javascripts/layout/layout.html',
       url: "/"
    })
    .state('login',{
      template: '<dev-login></dev-login>',
      parent: 'devtime',
      url: "login",
    })
    // .state('code',{
    //   template: '<or-code></or-code>',
    //   parent: 'app',
    //   url: "code",
    //   })
  }

}());
